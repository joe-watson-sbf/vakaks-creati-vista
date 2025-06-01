import React, { useState, useEffect, useCallback } from 'react';
import OutputPanel from './OutputPanel';

// Define the type for grid properties
interface GridProperties {
  columnsType: 'fixed' | 'responsive';
  fixedColumns: number; // For fixed columns (e.g., 3 for 3 columns)
  minColumnWidth: number; // For responsive columns (e.g., 200px)
  gap: number; // Gap between grid items (px)
  itemCount: number; // Number of items in the preview grid
}

const GridLayoutGenerator: React.FC = () => {
  const [gridProps, setGridProps] = useState<GridProperties>({
    columnsType: 'fixed',
    fixedColumns: 3,
    minColumnWidth: 200,
    gap: 16,
    itemCount: 6, // Default 6 items for preview
  });

  const [generatedCss, setGeneratedCss] = useState('');

  // Function to generate the CSS Grid string
  const generateGridCss = useCallback(() => {
    const { columnsType, fixedColumns, minColumnWidth, gap } = gridProps;

    let gridTemplateColumns = '';
    if (columnsType === 'fixed') {
      gridTemplateColumns = `repeat(${fixedColumns}, 1fr)`;
    } else { // 'responsive'
      gridTemplateColumns = `repeat(auto-fit, minmax(${minColumnWidth}px, 1fr))`;
    }

    const cssString =
      `display: grid;\n` +
      `grid-template-columns: ${gridTemplateColumns};\n` +
      `gap: ${gap}px;`;

    setGeneratedCss(cssString);
  }, [gridProps]);

  // Update CSS whenever gridProps change
  useEffect(() => {
    generateGridCss();
  }, [gridProps, generateGridCss]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;

    setGridProps(prevProps => ({
      ...prevProps,
      [id]: type === 'number' || type === 'range' ? parseInt(value, 10) : value,
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCss);
    alert('CSS copied to clipboard!');
  };

  // Create an array of grid items for the preview
  const gridItems = Array.from({ length: gridProps.itemCount }, (_, i) => i + 1);

  return (
    <div className="bg-background sm:grid grid-cols-9 gap-y-8 gap-x-16">

      {/* Controls Panel */}
      <div className="bg-background col-span-3 space-y-6 sm:mb-0 mb-16">
        <h3 className="text-2xl font-bold text-foreground">Properties</h3>
        {/* Columns Type Selector */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="columnsType" className="text-muted text-sm font-medium mb-2">Columns Type</label>
          <select
            id="columnsType"
            value={gridProps.columnsType}
            onChange={handleChange}
            className="w-full p-2.5 bg-background text-foreground rounded-md border border-muted focus:ring-primary focus:border-primary"
          >
            <option value="fixed">Fixed Number of Columns</option>
            <option value="responsive">Responsive (auto-fit/minmax)</option>
          </select>
        </div>

        {/* Fixed Columns (conditionally rendered) */}
        {gridProps.columnsType === 'fixed' && (
          <div className="flex flex-col">
            <label htmlFor="fixedColumns" className="text-muted text-sm font-medium mb-2">
              Number of Columns: {gridProps.fixedColumns}
            </label>
            <input
              type="range"
              id="fixedColumns"
              min="1"
              max="6"
              value={gridProps.fixedColumns}
              onChange={handleChange}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
            />
          </div>
        )}

        {/* Min Column Width (conditionally rendered) */}
        {gridProps.columnsType === 'responsive' && (
          <div className="flex flex-col">
            <label htmlFor="minColumnWidth" className="text-muted text-sm font-medium mb-2">
              Min Column Width: {gridProps.minColumnWidth}px
            </label>
            <input
              type="range"
              id="minColumnWidth"
              min="100"
              max="400"
              step="10"
              value={gridProps.minColumnWidth}
              onChange={handleChange}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
            />
          </div>
        )}

        {/* Gap */}
        <div className="flex flex-col">
          <label htmlFor="gap" className="text-muted text-sm font-medium mb-2">
            Gap between Items: {gridProps.gap}px
          </label>
          <input
            type="range"
            id="gap"
            min="0"
            max="50"
            value={gridProps.gap}
            onChange={handleChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
          />
        </div>

        {/* Item Count for Preview */}
        <div className="flex flex-col">
          <label htmlFor="itemCount" className="text-muted text-sm font-medium mb-2">
            Preview Items: {gridProps.itemCount}
          </label>
          <input
            type="range"
            id="itemCount"
            min="1"
            max="12"
            value={gridProps.itemCount}
            onChange={handleChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
          />
        </div>

      </div>

      <OutputPanel outputData={generatedCss} className="col-span-6 w-full">
        <div
          className="w-full h-full p-2"
          style={{
            display: 'grid',
            gridTemplateColumns: gridProps.columnsType === 'fixed'
              ? `repeat(${gridProps.fixedColumns}, 1fr)`
              : `repeat(auto-fit, minmax(${gridProps.minColumnWidth}px, 1fr))`,
            gap: `${gridProps.gap}px`,
          }}
        >
          {gridItems.map((item) => (
            <div
              key={item}
              className="bg-secondary text-primary-foreground flex items-center justify-center p-2 h-20"
            >
              {item}
            </div>
          ))}
        </div>
      </OutputPanel>
    </div>
  );
};

GridLayoutGenerator.displayName = 'GridLayoutGenerator';

export default GridLayoutGenerator;