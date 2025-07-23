import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Data {
  date: string; 
  value: number; 
}

const data: Data[] = [
  { date: '2025-07-01', value: 1100 },
  { date: '2025-07-02', value: 1320 },
  { date: '2025-07-03', value: 1380 },
  { date: '2025-07-04', value: 1590 },
  { date: '2025-07-05', value: 1680 },
  { date: '2025-07-06', value: 2750 },
];

export default function LineChart() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); 

    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const bounding = ref.current?.getBoundingClientRect();
    const width = (bounding?.width || 500) - margin.left - margin.right;
    const height = (bounding?.height || 300) - margin.top - margin.bottom;

    const parseDate = d3.timeParse('%Y-%m-%d');
    const formattedData = data.map(d => ({ ...d, date: parseDate(d.date)! }));

    const x = d3.scaleTime()
      .domain(d3.extent(formattedData, d => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(formattedData, d => d.value)! * 0.95, d3.max(formattedData, d => d.value)! * 1.05])
      .range([height, 0]);

    const line = d3.line<Data>()
      .x(d => x(d.date as unknown as Date))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('path')
      .datum(formattedData)
      .attr('fill', 'none')
      .attr('stroke', '#4CAF50')
      .attr('stroke-width', 2.5)
      .attr('d', line);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%d/%m')));

    g.append('g')
      .call(d3.axisLeft(y).tickFormat(d => `$${d}`));

    svg.append('text')
      .attr('x', (width + margin.left + margin.right) / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xl font-semibold text-nature-green')
      .text('Evolução de Ganhos em USD');


       const focus = g.append('g').style('display', 'none');
      
          focus.append('line')
            .attr('class', 'hover-line')
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '3,3');
      
          const circle = focus.append('circle')
            .attr('r', 4)
            .attr('fill', '#4CAF50')
            .attr('stroke', '#333');
      
          const tooltip = g.append('text')
            .attr('class', 'tooltip')
            .attr('fill', 'black')
            .style('font-size', '12px')
            .style('pointer-events', 'none')
            .style('display', 'none');
      
          svg.append('rect')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'transparent')
            .on('mouseover', () => {
              focus.style('display', null);
              tooltip.style('display', null);
            })
            .on('mouseout', () => {
              focus.style('display', 'none');
              tooltip.style('display', 'none');
            })
            .on('mousemove', function (event) {
              const mouseX = d3.pointer(event, this)[0];
              const x0 = x.invert(mouseX);
              const i = d3.bisector(d => d.date).left(formattedData, x0, 1);
              const d0 = formattedData[i - 1];
              const d1 = formattedData[i];
              const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      
              const cx = x(d.date);
              const cy = y(d.value);
      
              focus.attr('transform', `translate(${cx},0)`);
              circle.attr('cy', cy);
      
              tooltip
                .attr('x', cx + 10)
                .attr('y', cy)
                .text(`${d3.timeFormat('%d/%m')(d.date)}: $${d.value}`);
            });
  }, [data]);

  return <svg style={{ width: '100%', height: '100%', minHeight: '36vh', overflow: 'visible' }} ref={ref} />;
}