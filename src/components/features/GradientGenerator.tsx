import React, { useState, useEffect, useCallback, useMemo } from 'react';
import OutputPanel from './OutputPanel';

interface ColorStop {
  id: number;
  color: string;
  position: number;
}

interface GradientProperties {
  type: 'linear' | 'radial';
  angle: number;
  radialShape: 'circle' | 'ellipse';
  radialSize: 'closest-corner' | 'closest-side' | 'farthest-corner' | 'farthest-side';
  radialPositionX: number;
  radialPositionY: number;
  colorStops: ColorStop[];
}

const GradientTypeSelector = ({ type, onChange }: { type: string; onChange: any }) => (
  <div className="flex flex-col">
    <label htmlFor="type" className="text-muted text-sm font-medium mb-2">Gradient Type</label>
    <select
      id="type"
      value={type}
      onChange={onChange}
      className="w-full p-2.5 bg-background text-foreground rounded-md border border-muted focus:ring-primary focus:border-primary"
    >
      <option value="linear">Linear Gradient</option>
      <option value="radial">Radial Gradient</option>
    </select>
  </div>
);

const LinearControls = ({ angle, onChange }: { angle: number; onChange: any }) => (
  <div className="flex flex-col">
    <label htmlFor="angle" className="text-muted text-sm font-medium mb-2">
      Angle: <span className="text-foreground font-semibold">{angle}°</span>
    </label>
    <input
      type="range"
      id="angle"
      min="0"
      max="360"
      value={angle}
      onChange={onChange}
      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
    />
  </div>
);

const RadialControls = ({ props, onChange }: { props: GradientProperties; onChange: any }) => (
  <>
    {['radialShape', 'radialSize'].map((key) => (
      <div className="flex flex-col" key={key}>
        <label htmlFor={key} className="text-muted text-sm font-medium mb-2">
          {key === 'radialShape' ? 'Shape' : 'Size'}
        </label>
        <select
          id={key}
          value={(props as any)[key]}
          onChange={onChange}
          className="w-full p-2.5 bg-background text-foreground rounded-md border border-muted focus:ring-primary focus:border-primary"
        >
          {key === 'radialShape' ? (
            <>
              <option value="ellipse">Ellipse</option>
              <option value="circle">Circle</option>
            </>
          ) : (
            <>
              <option value="closest-side">Closest Side</option>
              <option value="closest-corner">Closest Corner</option>
              <option value="farthest-side">Farthest Side</option>
              <option value="farthest-corner">Farthest Corner</option>
            </>
          )}
        </select>
      </div>
    ))}
    {['radialPositionX', 'radialPositionY'].map((key) => (
      <div className="flex flex-col" key={key}>
        <label htmlFor={key} className="text-muted text-sm font-medium mb-2">
          {key === 'radialPositionX' ? 'Position X' : 'Position Y'}:{' '}
          <span className="text-foreground font-semibold">{(props as any)[key]}%</span>
        </label>
        <input
          type="range"
          id={key}
          min="0"
          max="100"
          value={(props as any)[key]}
          onChange={onChange}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
        />
      </div>
    ))}
  </>
);

const ColorStops = ({
  colorStops,
  onColorChange,
  onRemove,
  onAdd
}: {
  colorStops: ColorStop[];
  onColorChange: (id: number, field: keyof Omit<ColorStop, 'id'>, value: string | number) => void;
  onRemove: (id: number) => void;
  onAdd: () => void;
}) => (
  <div className="space-y-4 pt-4 border-t border-muted mt-6">
    <h4 className="text-xl font-bold text-foreground">Color Stops</h4>
    {colorStops.map((stop) => (
      <div key={stop.id} className="flex items-center gap-4 bg-primary-foreground p-3 rounded-md border border-muted">
        <input
          type="color"
          value={stop.color}
          onChange={(e) => onColorChange(stop.id, 'color', e.target.value)}
          className="w-10 h-10 rounded-md border border-muted p-0.5 cursor-pointer"
        />
        <div className="flex-grow">
          <label htmlFor={`position-${stop.id}`} className="text-muted text-xs font-medium block mb-1">
            Position: <span className="text-foreground font-semibold">{stop.position}%</span>
          </label>
          <input
            type="range"
            id={`position-${stop.id}`}
            min="0"
            max="100"
            value={stop.position}
            onChange={(e) => onColorChange(stop.id, 'position', parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
          />
        </div>
        {colorStops.length > 2 && (
          <button
            onClick={() => onRemove(stop.id)}
            className="bg-secondary text-primary-foreground p-2 rounded-md hover:bg-red-700 transition duration-300 transform hover:scale-105 text-sm"
            title="Remove Color Stop"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M16.5 4.478a.75.75 0 0 0-1.135-.872L12 5.462 8.635 3.606a.75.75 0 0 0-1.135.872l3.103 3.561L7.135 12a.75.75 0 0 0 .872 1.135L12 9.538l3.365 1.859a.75.75 0 0 0 .872-1.135l-3.103-3.561 3.103-3.561Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    ))}
    <button
      onClick={onAdd}
      disabled={colorStops.length >= 8}
      className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-secondary transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Add Color Stop
    </button>
  </div>
);

const GradientGenerator: React.FC = () => {
  const [gradientProps, setGradientProps] = useState<GradientProperties>({
    type: 'linear',
    angle: 90,
    radialShape: 'ellipse',
    radialSize: 'farthest-corner',
    radialPositionX: 50,
    radialPositionY: 50,
    colorStops: [
      { id: 1, color: '#FF6B6B', position: 0 },
      { id: 2, color: '#4ECDC4', position: 100 },
    ],
  });

  const [generatedCss, setGeneratedCss] = useState('');
  const [nextStopId, setNextStopId] = useState(3);

  const generateGradientCss = useCallback(() => {
    const sorted = [...gradientProps.colorStops].sort((a, b) => a.position - b.position);
    const stopsCss = sorted.map(stop => `${stop.color} ${stop.position}%`).join(', ');
    let cssString = '';

    if (gradientProps.type === 'linear') {
      cssString = `background-image: linear-gradient(${gradientProps.angle}deg, ${stopsCss});`;
    } else {
      const positionCss = `at ${gradientProps.radialPositionX}% ${gradientProps.radialPositionY}%`;
      cssString = `background-image: radial-gradient(${gradientProps.radialShape} ${gradientProps.radialSize} ${positionCss}, ${stopsCss});`;
    }

    setGeneratedCss(cssString);
  }, [gradientProps]);


  useEffect(() => {
    generateGradientCss();
  }, [gradientProps, generateGradientCss]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    setGradientProps(prev => ({
      ...prev,
      [id]: type === 'number' || type === 'range' ? parseInt(value, 10) : value,
    }));
  };

  const handleColorStopChange = (id: number, field: keyof Omit<ColorStop, 'id'>, value: string | number) => {
    setGradientProps(prev => {
      const updatedStops = prev.colorStops.map(stop =>
        stop.id === id ? { ...stop, [field]: value } : stop
      );
      return {
        ...prev,
        colorStops: updatedStops.sort((a, b) => a.position - b.position),
      };
    });
  };

  const handleAddColorStop = () => {
    if (gradientProps.colorStops.length >= 8) return;
    const maxPosition = Math.max(...gradientProps.colorStops.map(stop => stop.position));
    const newPosition = Math.min(100, maxPosition + 5);
    const newStop: ColorStop = {
      id: nextStopId,
      color: '#FFFFFF',
      position: newPosition,
    };
    setNextStopId(prev => prev + 1);
    setGradientProps(prev => ({
      ...prev,
      colorStops: [...prev.colorStops, newStop].sort((a, b) => a.position - b.position),
    }));
  };



  const handleRemoveColorStop = (id: number) => {
    if (gradientProps.colorStops.length <= 2) return;
    setGradientProps(prev => ({
      ...prev,
      colorStops: prev.colorStops.filter(stop => stop.id !== id),
    }));
  };

  return (
    <div className="bg-background sm:grid grid-cols-9 gap-y-8 gap-x-16">
      <div className="bg-background col-span-3 space-y-6 sm:mb-0 mb-16">
        <h3 className="text-2xl font-bold text-foreground mb-6">Properties</h3>
        <GradientTypeSelector type={gradientProps.type} onChange={handleChange} />
        {gradientProps.type === 'linear' && <LinearControls angle={gradientProps.angle} onChange={handleChange} />}
        {gradientProps.type === 'radial' && <RadialControls props={gradientProps} onChange={handleChange} />}
        <ColorStops
          colorStops={gradientProps.colorStops}
          onColorChange={handleColorStopChange}
          onRemove={handleRemoveColorStop}
          onAdd={handleAddColorStop}
        />
      </div>
      <OutputPanel outputData={generatedCss} className="col-span-6 w-full">
        <div
          id="gradientPreview"
          className="w-full h-full min-h-[250px] rounded-lg border border-muted"
          style={{ backgroundImage: generatedCss.replace('background-image: ', '').replace(';', '') }}
        ></div>
      </OutputPanel>
    </div>
  );
};

export default GradientGenerator;