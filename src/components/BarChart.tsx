import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Data {
  categoria: string; 
  value: number; 
}
const data: Data[] = [
  { categoria: 'Milho', value: 450 },
  { categoria: 'Ervilha', value: 300 },
  { categoria: 'Azeitona', value: 150 },
  { categoria: 'Arroz', value: 300 },
  { categoria: 'Soja', value: 350 },
  { categoria: 'Uva', value: 150 },
  { categoria: 'Café', value: 220 },
];

export default function BarChart() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const bounding = ref.current?.getBoundingClientRect();
    const width = (bounding?.width || 500) - margin.left - margin.right;
    const height = (bounding?.height || 300) - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(data.map(d => d.categoria))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .nice()
      .range([height, 0]);

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.categoria)!)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', '#4CAF50');

      g.selectAll('.label-categoria')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label-categoria')
        .text(d => d.categoria)
        .attr('x', d => x(d.categoria)! + x.bandwidth() / 2)
        .attr('y', d => y(d.value) - 10)
        .attr('text-anchor', 'middle')
        .attr('fill', '#333')
        .attr('font-size', '22px')
        .attr('font-family', 'sans-serif');

     g.selectAll('.label-valor')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label-valor')
      .text(d => d.value)
      .attr('x', d => x(d.categoria)! + x.bandwidth() / 2)
      .attr('y', d => y(d.value) + 30)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '22px')
      .attr('font-family', 'sans-serif');
  }, [data]);

  return <svg  style={{ width: '100%', height: '100%', overflow: 'visible' }}  ref={ref} />;
}