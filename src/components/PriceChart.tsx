import { useEffect, useRef, useState } from 'react'
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  ColorType,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type HistogramData,
  type UTCTimestamp,
} from 'lightweight-charts'
import { fetchCandles } from '../lib/yahoo'
import './PriceChart.css'

const RANGES = [
  { id: '1d', range: '1d', interval: '1m', label: '1D' },
  { id: '5d', range: '5d', interval: '15m', label: '5D' },
  { id: '1mo', range: '1mo', interval: '1h', label: '1M' },
  { id: '3mo', range: '3mo', interval: '1d', label: '3M' },
] as const

export function PriceChart() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candleRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const volRef = useRef<ISeriesApi<'Histogram'> | null>(null)
  const [rangeId, setRangeId] = useState<(typeof RANGES)[number]['id']>('5d')
  const [status, setStatus] = useState('Loading Yahoo…')

  useEffect(() => {
    if (!wrapRef.current) return
    const chart = createChart(wrapRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#71767b',
        fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
      },
      grid: {
        vertLines: { color: 'rgba(231, 233, 234, 0.08)' },
        horzLines: { color: 'rgba(231, 233, 234, 0.08)' },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false, timeVisible: true, secondsVisible: false },
      crosshair: { mode: 1 },
      height: 240,
    })
    const candles = chart.addSeries(CandlestickSeries, {
      upColor: '#00ba7c',
      downColor: '#f4212e',
      borderUpColor: '#00ba7c',
      borderDownColor: '#f4212e',
      wickUpColor: '#00ba7c',
      wickDownColor: '#f4212e',
    })
    const vols = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: 'vol',
    })
    chart.priceScale('vol').applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    })
    chartRef.current = chart
    candleRef.current = candles
    volRef.current = vols

    const ro = new ResizeObserver(() => {
      if (!wrapRef.current) return
      chart.applyOptions({ width: wrapRef.current.clientWidth })
    })
    ro.observe(wrapRef.current)

    return () => {
      ro.disconnect()
      chart.remove()
      chartRef.current = null
    }
  }, [])

  useEffect(() => {
    const cfg = RANGES.find((r) => r.id === rangeId)!
    let alive = true
    const load = async () => {
      try {
        setStatus(`Yahoo ${cfg.label} · includePrePost`)
        const rows = await fetchCandles('SPCX', cfg.range, cfg.interval)
        if (!alive || !candleRef.current || !volRef.current) return
        const cdata: CandlestickData[] = rows.map((r) => ({
          time: r.time as UTCTimestamp,
          open: r.open,
          high: r.high,
          low: r.low,
          close: r.close,
        }))
        const vdata: HistogramData[] = rows.map((r) => ({
          time: r.time as UTCTimestamp,
          value: r.volume,
          color:
            r.close >= r.open ? 'rgba(0, 186, 124, 0.4)' : 'rgba(244, 33, 46, 0.4)',
        }))
        candleRef.current.setData(cdata)
        volRef.current.setData(vdata)
        chartRef.current?.timeScale().fitContent()
        setStatus(`${rows.length} bars · Yahoo pre/post · ${new Date().toLocaleTimeString()}`)
      } catch (e) {
        if (!alive) return
        setStatus(e instanceof Error ? e.message : 'chart error')
      }
    }
    load()
    const id = setInterval(load, 60_000)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [rangeId])

  return (
    <div className="chart-panel">
      <div className="chart-panel__bar">
        <div className="chart-panel__ranges">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={rangeId === r.id ? 'is-active' : ''}
              onClick={() => setRangeId(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
        <p className="chart-panel__status">{status}</p>
      </div>
      <div ref={wrapRef} className="chart-panel__canvas" />
    </div>
  )
}
