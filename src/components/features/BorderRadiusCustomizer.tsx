import React, { useState, useEffect, useCallback } from 'react';
import OutputPanel from './OutputPanel'; // Assuming OutputPanel is in the same directory or correctly imported

// Define the type for border radius properties for each corner
interface BorderRadiusProperties {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

// Small component for a single border radius control (slider)
const BorderRadiusControl = ({
  label,
  id,
  value,
  onChange,
}: {
  label: string;
  id: keyof BorderRadiusProperties; // Ensure ID matches a key in BorderRadiusProperties
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-muted text-sm font-medium mb-2">
      {label}: <span className="text-foreground font-semibold">{value}px</span>
    </label>
    <input
      type="range"
      id={id}
      min="0"
      max="100"
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
    />
  </div>
);

const BorderRadiusCustomizer: React.FC = () => {
  const [borderRadiusProps, setBorderRadiusProps] = useState<BorderRadiusProperties>({
    topLeft: 20,
    topRight: 20,
    bottomRight: 20,
    bottomLeft: 20,
  });

  const [generatedCss, setGeneratedCss] = useState('');

  // Function to generate the CSS border-radius string
  const generateBorderRadiusCss = useCallback(() => {
    const { topLeft, topRight, bottomRight, bottomLeft } = borderRadiusProps;

    const cssString = `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`;

    setGeneratedCss(cssString);
  }, [borderRadiusProps]);

  // Update CSS whenever borderRadiusProps change
  useEffect(() => {
    generateBorderRadiusCss();
  }, [borderRadiusProps, generateBorderRadiusCss]);

  // Handle input changes for any of the border radius sliders
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // Ensure the ID matches a key in BorderRadiusProperties
    if (id in borderRadiusProps) {
      setBorderRadiusProps(prevProps => ({
        ...prevProps,
        [id]: parseInt(value, 10),
      }));
    }
  };

  return (
    <div className="bg-background sm:grid grid-cols-9 gap-y-8 gap-x-16">

      {/* Controls Panel */}
      <div className="bg-background col-span-3 space-y-6 sm:mb-0 mb-16">
        <h3 className="text-2xl font-bold text-foreground mb-6">Properties</h3>

        {/* Top-Left Radius Control */}
        <BorderRadiusControl
          label="Top-Left Radius"
          id="topLeft"
          value={borderRadiusProps.topLeft}
          onChange={handleChange}
        />

        {/* Top-Right Radius Control */}
        <BorderRadiusControl
          label="Top-Right Radius"
          id="topRight"
          value={borderRadiusProps.topRight}
          onChange={handleChange}
        />

        {/* Bottom-Right Radius Control */}
        <BorderRadiusControl
          label="Bottom-Right Radius"
          id="bottomRight"
          value={borderRadiusProps.bottomRight}
          onChange={handleChange}
        />

        {/* Bottom-Left Radius Control */}
        <BorderRadiusControl
          label="Bottom-Left Radius"
          id="bottomLeft"
          value={borderRadiusProps.bottomLeft}
          onChange={handleChange}
        />
      </div>

      {/* Output Panel (reusing your component) */}
      <OutputPanel outputData={generatedCss} className="col-span-6 w-full">
        <div
          id="borderRadiusPreview"
          className="w-48 h-48 bg-accent flex items-center justify-center text-foreground font-semibold text-base transition-all duration-100 ease-out"
          style={{ borderRadius: generatedCss.replace('border-radius: ', '').replace(';', '') }}
        >
          Preview Shape
        </div>
      </OutputPanel>
    </div>
  );
};

BorderRadiusCustomizer.displayName = 'BorderRadiusCustomizer';
export default BorderRadiusCustomizer;