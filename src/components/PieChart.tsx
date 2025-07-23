import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

type PieData = {
  label: string;
  value: number;
};

  const data = [
    { label: 'Investimentos', value: 15 },
    { label: 'Ganho', value: 48 },
    { label: 'Custo', value: 13 },
    { label: 'Lucro', value: 7 },
    { label: 'Despesas', value: 17 },
  ];

export default function PieChart() {
   const svgRef = useRef<SVGSVGElement | null>(null);

   const colorScale = d3
  .scaleOrdinal<string>()
  .domain(data.map((d) => d.label))
  .range(['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#B21118']);

  const [activeLabels, setActiveLabels] = useState<string[]>(data.map(d => d.label));
  const filteredData = data.filter(d => activeLabels.includes(d.label));

  const toggleLabel = (label: string) => {
    setActiveLabels((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };

 useEffect(() => {
  if (!svgRef.current) return;

  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;

  const svg = d3.select(svgRef.current);
  svg.selectAll('*').remove();

  const chartGroup = svg
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const pie = d3.pie<PieData>().value((d) => d.value);
  const arc = d3.arc<d3.PieArcDatum<PieData>>().innerRadius(0).outerRadius(radius);


  const tooltip = d3.select('body')
    .append('div')
    .style('position', 'absolute')
    .style('pointer-events', 'none')
    .style('background', 'black')
    .style('color', 'white')
    .style('padding', '8px 12px')
    .style('border-radius', '6px')
    .style('font-size', '14px')
    .style('opacity', 0)
    .style('transition', 'opacity 0.2s ease');

  const arcs = chartGroup.selectAll('path')
    .data(pie(filteredData))
    .enter()
    .append('g');

  arcs
    .append('path')
    .attr('d', arc)
    .attr('fill', (d) => colorScale(d.data.label))
    .on('mouseover', function (event, d) {
      tooltip
        .style('opacity', 1)
        .html(`<strong>${d.data.label}</strong>: ${d.data.value}%`);
    })
    .on('mousemove', function (event) {
      tooltip
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY - 28 + 'px');
    })
    .on('mouseout', function () {
      tooltip.style('opacity', 0);
    });

  arcs
    .append('text')
    .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('dy', '0.25em')
    .style('font-size', '20px')
    .style('font-weight', 'bold')
    .style('pointer-events', 'none')
    .style('fill', '#fff')
    .text((d) => `${d.data.value}%`);

  return () => {
    tooltip.remove();
  };
}, [filteredData]);

  return (
  <div style={{ display: 'flex', gap: '2rem', width:'100%', justifyContent:'center' }}>
      <svg ref={svgRef}></svg>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', gap: '8px' }}>
        {data.map((item) => (
          <button
            key={item.label}
            onClick={() => toggleLabel(item.label)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px',
              borderRadius: '6px',
              color: 'black',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '22px',
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                backgroundColor: activeLabels.includes(item.label) ? colorScale(item.label) : '#e0e0e0',
              }}
            />
            {item.label}
          </button>
        ))}
      </div>
    </div>
);
}