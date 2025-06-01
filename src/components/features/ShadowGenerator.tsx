import React, { useState, useEffect, useCallback } from 'react';
import OutputPanel from './OutputPanel'; // Assuming OutputPanel is in the same directory or correctly imported

// Define the type for shadow properties
interface ShadowProperties {
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius: number;
  color: string; // Hex color string
  opacity: number; // 0-100
  inset: boolean;
}

const ShadowGenerator: React.FC = () => {
  const [shadowProps, setShadowProps] = useState<ShadowProperties>({
    offsetX: 0,
    offsetY: 5,
    blurRadius: 10,
    spreadRadius: 0,
    color: '#000000',
    opacity: 20,
    inset: false,
  });

  const [generatedCss, setGeneratedCss] = useState('');

  // Function to generate the CSS box-shadow string
  const generateBoxShadowCss = useCallback(() => {
    const { offsetX, offsetY, blurRadius, spreadRadius, color, opacity, inset } = shadowProps;

    // Convert hex color to RGBA for opacity
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    };

    const rgbaColor = `${hexToRgb(color)}, ${(opacity / 100).toFixed(2)}`;
    const insetKeyword = inset ? 'inset ' : '';

    const cssString =
      `box-shadow: ${insetKeyword}${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px rgba(${rgbaColor});\n` +
      `-webkit-box-shadow: ${insetKeyword}${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px rgba(${rgbaColor});\n` +
      `-moz-box-shadow: ${insetKeyword}${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px rgba(${rgbaColor});`;

    setGeneratedCss(cssString);
  }, [shadowProps]);

  // Update CSS whenever shadowProps change
  useEffect(() => {
    generateBoxShadowCss();
  }, [shadowProps, generateBoxShadowCss]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;

    setShadowProps(prevProps => ({
      ...prevProps,
      [id]: type === 'checkbox' ? checked : (type === 'range' || id === 'opacity') ? parseInt(value, 10) : value,
    }));
  };

  return (
    <div className="bg-background sm:grid grid-cols-9 gap-y-8 gap-x-16">

      {/* Controls Panel */}
      <div className="bg-background col-span-3 space-y-6 sm:mb-0 mb-16">
        <h3 className="text-2xl font-bold text-foreground mb-6">Properties</h3>

        {/* Horizontal Offset */}
        <div className="flex flex-col">
          <label htmlFor="offsetX" className="text-muted text-sm font-medium mb-2">
            Horizontal Offset: <span className="text-foreground font-semibold">{shadowProps.offsetX}px</span>
          </label>
          <input
            type="range"
            id="offsetX"
            min="-50"
            max="50"
            value={shadowProps.offsetX}
            onChange={handleChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
          />
        </div>

        {/* Vertical Offset */}
        <div className="flex flex-col">
          <label htmlFor="offsetY" className="text-muted text-sm font-medium mb-2">
            Vertical Offset: <span className="text-foreground font-semibold">{shadowProps.offsetY}px</span>
          </label>
          <input
            type="range"
            id="offsetY"
            min="-50"
            max="50"
            value={shadowProps.offsetY}
            onChange={handleChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
          />
        </div>

        {/* Blur Radius */}
        <div className="flex flex-col">
          <label htmlFor="blurRadius" className="text-muted text-sm font-medium mb-2">
            Blur Radius: <span className="text-foreground font-semibold">{shadowProps.blurRadius}px</span>
          </label>
          <input
            type="range"
            id="blurRadius"
            min="0"
            max="100"
            value={shadowProps.blurRadius}
            onChange={handleChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
          />
        </div>

        {/* Spread Radius */}
        <div className="flex flex-col">
          <label htmlFor="spreadRadius" className="text-muted text-sm font-medium mb-2">
            Spread Radius: <span className="text-foreground font-semibold">{shadowProps.spreadRadius}px</span>
          </label>
          <input
            type="range"
            id="spreadRadius"
            min="-50"
            max="50"
            value={shadowProps.spreadRadius}
            onChange={handleChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
          />
        </div>

        {/* Color */}
        <div className="flex flex-col">
          <label htmlFor="color" className="text-muted text-sm font-medium mb-2">Color</label>
          <input
            type="color"
            id="color"
            value={shadowProps.color}
            onChange={handleChange}
            className="w-full h-10 rounded-md border border-muted p-0.5 cursor-pointer"
          />
          <span className="text-foreground mt-2 text-right">{shadowProps.color}</span>
        </div>

        {/* Opacity */}
        <div className="flex flex-col">
          <label htmlFor="opacity" className="text-muted text-sm font-medium mb-2">
            Opacity: <span className="text-foreground font-semibold">{shadowProps.opacity}%</span>
          </label>
          <input
            type="range"
            id="opacity"
            min="0"
            max="100"
            value={shadowProps.opacity}
            onChange={handleChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
          />
        </div>

        {/* Inset Checkbox */}
        <div className="flex items-center mt-8">
          <input
            type="checkbox"
            id="inset"
            checked={shadowProps.inset}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-primary rounded border-muted focus:ring-primary focus:border-primary cursor-pointer"
          />
          <label htmlFor="inset" className="ml-2 text-foreground text-lg">Inset Shadow</label>
        </div>
      </div>

      {/* Output Panel (reusing your component) */}
      <OutputPanel outputData={generatedCss} className="col-span-6 w-full">
        <div
          id="shadowPreviewBox"
          className="my-16 w-48 min-h-48 bg-white rounded-lg flex items-center justify-center text-primary font-semibold text-lg transition-all duration-100 ease-out"
          style={{ boxShadow: generatedCss.split('\n')[0].replace('box-shadow: ', '').replace(';', '') }}
        >
          Preview Box
        </div>
      </OutputPanel>
    </div>
  );
};

ShadowGenerator.displayName = 'ShadowGenerator';
export default ShadowGenerator;