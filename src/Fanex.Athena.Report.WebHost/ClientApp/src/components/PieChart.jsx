import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import NumberFormat from '@/lib/numberFormat';

const PieChart = ({ data, size, colors }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const radius = size / 2;
    const center = size / 2;
    const total = data.reduce((sum, d) => sum + Number(d.value), 0);

    // Helper to describe an SVG arc
    const describeArc = (cx, cy, r, startAngle, endAngle) => {
        const rad = (deg) => (Math.PI / 180) * deg;
        const x1 = cx + r * Math.cos(rad(startAngle));
        const y1 = cy + r * Math.sin(rad(startAngle));
        const x2 = cx + r * Math.cos(rad(endAngle));
        const y2 = cy + r * Math.sin(rad(endAngle));
        const largeArc = endAngle - startAngle > 180 ? 1 : 0;
        return [`M ${cx} ${cy}`, `L ${x1} ${y1}`, `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`, 'Z'].join(' ');
    };

    let startAngle = 0;
    const paths = [];
    const labels = [];
    data.forEach((d, i) => {
        const value = Number(d.value);
        if (total === 0 || value === 0) {
            startAngle += 0;
            return;
        }
        const angle = (value / total) * 360;
        const endAngle = startAngle + angle;
        const color = colors[i % colors.length];
        const midAngle = startAngle + angle / 2;
        const labelRadius = radius * 0.5;
        const labelX = center + labelRadius * Math.cos(((midAngle - 90) * Math.PI) / 180);
        const labelY = center + labelRadius * Math.sin(((midAngle - 90) * Math.PI) / 180);
        const percentage = ((value / total) * 100).toFixed(2);
        const commonProps = {
            onMouseEnter: (e) => {
                setHoveredIndex(i);
                setMousePos({ x: e.clientX, y: e.clientY });
            },
            onMouseMove: (e) => {
                setMousePos({ x: e.clientX, y: e.clientY });
            },
            onMouseLeave: () => setHoveredIndex(null),
            style: { cursor: 'pointer' },
        };
        if (value === total) {
            paths.push(<circle key={i} cx={center} cy={center} r={radius} fill={color} stroke="#fff" strokeWidth="1" {...commonProps} />);
        } else {
            const path = describeArc(center, center, radius, startAngle - 90, endAngle - 90);
            paths.push(<path key={i} d={path} fill={color} stroke="#fff" strokeWidth="1" {...commonProps} />);
        }
        // Add percent label
        labels.push(
            <text key={`label-${i}`} x={labelX} y={labelY} textAnchor="middle" dominantBaseline="middle" className="piechart-percent-label">
                {percentage}%
            </text>
        );
        startAngle = endAngle;
    });

    // Tooltip rendered via portal
    const tooltip =
        hoveredIndex !== null && data[hoveredIndex]
            ? createPortal(
                  (() => {
                      const value = NumberFormat.formatDecimal(data[hoveredIndex].value);
                      const color = colors[hoveredIndex % colors.length];
                      return (
                          <div
                              className="piechart-tooltip"
                              style={{
                                  left: mousePos.x + 10,
                                  top: mousePos.y + 10,
                                  position: 'fixed',
                              }}>
                              <div>{data[hoveredIndex].name}</div>
                              <div className="piechart-tooltip-value-row">
                                  <span className="piechart-tooltip-colorbox" style={{ background: color }} />
                                  {value}
                              </div>
                          </div>
                      );
                  })(),
                  document.body
              )
            : null;

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {paths}
                {labels}
            </svg>
            {tooltip}
        </div>
    );
};

PieChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    size: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
};

PieChart.defaultProps = {
    data: [],
    size: 60,
    colors: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099'],
};

export default PieChart;
