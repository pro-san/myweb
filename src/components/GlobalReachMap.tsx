import React, { useState, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import worldData from '../data/world-110m.json';
import { GLOBAL_COUNTRIES, GlobalCountryData } from '../data/globalReachData';

interface GlobalReachMapProps {
  selectedCountryId: string | null;
  onSelectCountry: (country: GlobalCountryData) => void;
  isKhmer: boolean;
}

export const GlobalReachMap: React.FC<GlobalReachMapProps> = ({
  selectedCountryId,
  onSelectCountry,
  isKhmer,
}) => {
  const [hoveredCountry, setHoveredCountry] = useState<GlobalCountryData | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const width = 960;
  const height = 480;

  // D3 Geo Projection & Path Generator
  const { countriesGeo, spherePath, graticulePath, projection, countryMap } = useMemo(() => {
    // Geo Equal Earth gives a realistic, balanced worldwide view
    const proj = d3
      .geoEqualEarth()
      .scale(165)
      .translate([width / 2, height / 2 + 10]);

    const pathGen = d3.geoPath(proj);

    // Convert TopoJSON to GeoJSON features
    const countries = feature(worldData as any, (worldData as any).objects.countries) as any;
    const graticule = d3.geoGraticule10();

    const countryLookup = new Map<number, GlobalCountryData>();
    GLOBAL_COUNTRIES.forEach((c) => {
      countryLookup.set(c.isoNumeric, c);
    });

    return {
      countriesGeo: countries.features || [],
      spherePath: pathGen({ type: 'Sphere' } as any) || '',
      graticulePath: pathGen(graticule) || '',
      projection: proj,
      countryMap: countryLookup,
    };
  }, []);

  // Compute coordinates for markers and connecting arcs
  const hqCountry = GLOBAL_COUNTRIES.find((c) => c.isHQ)!;
  const [hqX, hqY] = projection(hqCountry.coordinates) || [0, 0];

  const markerPositions = useMemo(() => {
    return GLOBAL_COUNTRIES.map((c) => {
      const [x, y] = projection(c.coordinates) || [0, 0];
      return {
        ...c,
        x,
        y,
      };
    });
  }, [projection]);

  // Compute curved connecting data arcs from Cambodia (HQ) to US, CA, UK
  const dataArcs = useMemo(() => {
    const pathGen = d3.geoPath(projection);
    return GLOBAL_COUNTRIES.filter((c) => !c.isHQ).map((target) => {
      const geoLine: any = {
        type: 'LineString',
        coordinates: [hqCountry.coordinates, target.coordinates],
      };
      return {
        id: `arc-${target.id}`,
        target,
        d: pathGen(geoLine) || '',
      };
    });
  }, [projection, hqCountry]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
      {/* Top Map Action Toolbar */}
      <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <div className="flex items-center gap-2 font-mono text-slate-300">
            <i className="fa-solid fa-earth-americas text-blue-400"></i>
            <span className="font-bold">
              {isKhmer ? 'ផែនទីពិភពលោក D3 DUAL-SYNC' : 'D3 GEO INTERACTIVE RUNTIME'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>4 High-Throughput Production Zones</span>
          </div>
          <button
            onClick={() => {
              const hq = GLOBAL_COUNTRIES.find((c) => c.isHQ)!;
              onSelectCountry(hq);
            }}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-location-crosshairs mr-1"></i>
            <span>{isKhmer ? 'ផ្តោតលើ HQ' : 'Focus HQ (KH)'}</span>
          </button>
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="relative p-2 sm:p-4 select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[560px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setHoveredCountry(null);
            setMousePos(null);
          }}
        >
          <defs>
            {/* Gradients for connecting lines */}
            <linearGradient id="arc-gradient-us" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="arc-gradient-ca" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="arc-gradient-uk" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
            </linearGradient>

            {/* Glowing marker filters */}
            <filter id="glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-blue" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Oceans / Sphere background */}
          <path
            d={spherePath}
            className="fill-slate-950/70 stroke-slate-800"
            strokeWidth="1.2"
          />

          {/* Geo Graticules (Latitude / Longitude lines) */}
          <path
            d={graticulePath}
            fill="none"
            className="stroke-slate-800/40"
            strokeWidth="0.5"
            strokeDasharray="2,3"
          />

          {/* All World Countries */}
          <g className="countries-layer">
            {countriesGeo.map((featureObj: any, index: number) => {
              const numericId = Number(featureObj.id);
              const matchedCountry = countryMap.get(numericId);
              const isSelected = selectedCountryId === matchedCountry?.id;
              const isHovered = hoveredCountry?.id === matchedCountry?.id;
              const pathD = d3.geoPath(projection)(featureObj) || '';

              if (matchedCountry) {
                // Highlighted countries (US, CA, UK, KH)
                let fillColor = 'rgba(51, 65, 85, 0.7)';
                let strokeColor = '#64748b';

                if (matchedCountry.id === 'KH') {
                  fillColor = isSelected || isHovered ? 'rgba(16, 185, 129, 0.45)' : 'rgba(16, 185, 129, 0.25)';
                  strokeColor = '#10b981';
                } else if (matchedCountry.id === 'US') {
                  fillColor = isSelected || isHovered ? 'rgba(59, 130, 246, 0.45)' : 'rgba(59, 130, 246, 0.25)';
                  strokeColor = '#3b82f6';
                } else if (matchedCountry.id === 'CA') {
                  fillColor = isSelected || isHovered ? 'rgba(2, 132, 199, 0.45)' : 'rgba(2, 132, 199, 0.25)';
                  strokeColor = '#0284c7';
                } else if (matchedCountry.id === 'UK') {
                  fillColor = isSelected || isHovered ? 'rgba(245, 158, 11, 0.45)' : 'rgba(245, 158, 11, 0.25)';
                  strokeColor = '#f59e0b';
                }

                return (
                  <path
                    key={`country-${featureObj.id || index}`}
                    d={pathD}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected || isHovered ? '2' : '1.2'}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredCountry(matchedCountry)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => onSelectCountry(matchedCountry)}
                  />
                );
              }

              // Standard neutral background countries
              return (
                <path
                  key={`country-${featureObj.id || index}`}
                  d={pathD}
                  className="fill-slate-800/40 hover:fill-slate-800/60 stroke-slate-700/30 transition-colors duration-150"
                  strokeWidth="0.6"
                />
              );
            })}
          </g>

          {/* Great Circle Connection Arcs from Cambodia HQ to US, CA, UK */}
          <g className="connection-arcs pointer-events-none">
            {dataArcs.map((arc) => {
              const isTargetSelected = selectedCountryId === arc.target.id;
              const isHqSelected = selectedCountryId === 'KH';
              const isHighlight = isTargetSelected || isHqSelected || !selectedCountryId;

              let gradientId = 'arc-gradient-us';
              if (arc.target.id === 'CA') gradientId = 'arc-gradient-ca';
              if (arc.target.id === 'UK') gradientId = 'arc-gradient-uk';

              return (
                <g key={arc.id}>
                  {/* Subtle wide glow line */}
                  <path
                    d={arc.d}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={isHighlight ? '3' : '1.5'}
                    strokeOpacity={isHighlight ? '0.25' : '0.1'}
                  />
                  {/* Active animated dashed data line */}
                  <path
                    d={arc.d}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={isHighlight ? '1.8' : '1.2'}
                    strokeDasharray="5,6"
                    strokeOpacity={isHighlight ? '0.9' : '0.4'}
                    className="animate-pulse"
                  />
                </g>
              );
            })}
          </g>

          {/* Pulsing Markers for US, CA, UK, KH */}
          <g className="markers-layer">
            {markerPositions.map((marker) => {
              const isSelected = selectedCountryId === marker.id;
              const isHovered = hoveredCountry?.id === marker.id;

              return (
                <g
                  key={`marker-${marker.id}`}
                  className="cursor-pointer group"
                  onClick={() => onSelectCountry(marker)}
                  onMouseEnter={() => setHoveredCountry(marker)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  {/* Outer Pulsing Wave Circle 1 */}
                  <circle
                    cx={marker.x}
                    cy={marker.y}
                    r={isSelected || isHovered ? '24' : '18'}
                    fill="none"
                    stroke={marker.color}
                    strokeWidth="1.5"
                    opacity="0.75"
                    className="animate-ping"
                    style={{
                      transformOrigin: `${marker.x}px ${marker.y}px`,
                      animationDuration: marker.isHQ ? '1.8s' : '2.4s',
                    }}
                  />

                  {/* Outer Pulsing Wave Circle 2 */}
                  <circle
                    cx={marker.x}
                    cy={marker.y}
                    r={isSelected || isHovered ? '16' : '12'}
                    fill={marker.color}
                    opacity={isSelected || isHovered ? '0.35' : '0.2'}
                  />

                  {/* Solid Center Anchor Dot */}
                  <circle
                    cx={marker.x}
                    cy={marker.y}
                    r={marker.isHQ ? '6.5' : '5'}
                    fill={marker.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    filter={marker.isHQ ? 'url(#glow-emerald)' : 'url(#glow-blue)'}
                  />

                  {/* Floating Pill Label */}
                  <g
                    transform={`translate(${marker.x + (marker.id === 'US' || marker.id === 'CA' ? -65 : 12)}, ${
                      marker.y + (marker.id === 'CA' ? -18 : marker.id === 'KH' ? 14 : -12)
                    })`}
                    className="transition-transform duration-200"
                  >
                    <rect
                      width={marker.isHQ ? '88' : '62'}
                      height="22"
                      rx="6"
                      fill="#0f172a"
                      stroke={marker.color}
                      strokeWidth={isSelected || isHovered ? '1.5' : '1'}
                      className="shadow-md"
                      opacity="0.95"
                    />
                    <text
                      x={marker.isHQ ? '44' : '31'}
                      y="14"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {marker.flag} {marker.id} {marker.isHQ ? 'HQ' : ''}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* Dedicated Central HQ Beacon */}
          <g transform={`translate(${hqX}, ${hqY})`} pointerEvents="none">
            <circle r="2.5" fill="#ffffff" />
          </g>
        </svg>

        {/* Dynamic Glassy Hover Tooltip */}
        {hoveredCountry && mousePos && (
          <div
            className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full pb-3 transition-opacity duration-150"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
            }}
          >
            <div className="bg-slate-950/95 border border-slate-700 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl text-xs w-64">
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{hoveredCountry.flag}</span>
                  <div>
                    <div className="font-bold text-white text-xs">
                      {isKhmer ? hoveredCountry.nameKm : hoveredCountry.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {isKhmer ? hoveredCountry.cityNodeKm : hoveredCountry.cityNode}
                    </div>
                  </div>
                </div>
                {hoveredCountry.isHQ && (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold border border-emerald-500/30">
                    HQ
                  </span>
                )}
              </div>

              <div className="space-y-1.5 font-mono text-[11px] mb-2.5">
                <div className="flex justify-between text-slate-400">
                  <span>Impact:</span>
                  <span className="text-amber-300 font-bold">
                    {hoveredCountry.metrics.primaryNumber}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Latency:</span>
                  <span className="text-emerald-400 font-bold">
                    {hoveredCountry.metrics.latency}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Zone:</span>
                  <span className="text-sky-300">
                    {hoveredCountry.metrics.timezone.split(' ')[0]}
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-blue-400 flex items-center justify-center gap-1 font-sans font-semibold pt-1 border-t border-slate-800/80">
                <i className="fa-solid fa-arrow-pointer text-[9px]"></i>
                <span>Click to inspect technical deployments</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend Footer */}
      <div className="px-5 py-3 bg-slate-950/90 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-white font-semibold">KH</span> (Engineering HQ)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="text-white font-semibold">US</span> (Enterprise Bots)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
            <span className="text-white font-semibold">CA</span> (Inventory & Webhooks)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-white font-semibold">UK</span> (Telecom & CRM)
          </div>
        </div>

        <div className="text-slate-500 text-[11px]">
          <i className="fa-solid fa-route text-emerald-400 mr-1.5"></i>
          <span>Sub-180ms Global Remote Delivery Pipeline</span>
        </div>
      </div>
    </div>
  );
};
