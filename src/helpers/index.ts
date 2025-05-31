interface Feature {
  title: string;
  description: string;
  link: string;
  previewHtml: string;
}

export const features: Feature[] = [
  {
    title: "Dynamic Shadow Generator",
    description: "Effortlessly add depth and visual appeal to your elements. Adjust offset, blur, spread, color, and opacity in real-time.",
    link: "#shadow",
    previewHtml: `
      <div class="w-full min-h-32 h-full bg-white  flex items-center justify-center">
          <div class="w-36 h-20 bg-white  shadow-xl" style="box-shadow: 0px 12px 25px -8px oklch(0.2022 0 0 / 0.4);"></div>
      </div>
    `,
  },
  {
    title: "Flexible Grid Layout Creator",
    description: "Design complex CSS Grid layouts with ease. Define rows, columns, and gaps visually, then copy the code.",
    link: "#grid-layout",
    previewHtml: `
      <div class="w-full min-h-32 h-full bg-background  p-2">
          <div class="grid grid-cols-3 gap-2 w-full h-full">
              <div class="bg-primary"></div>
              <div class="bg-primary"></div>
              <div class="bg-primary"></div>
              <div class="bg-primary"></div>
              <div class="bg-primary"></div>
              <div class="bg-primary"></div>
          </div>
      </div>
    `,
  },
  {
    title: "Responsive Grids (No Media Queries)",
    description: "Create truly adaptive layouts using modern CSS Grid and Flexbox techniques, eliminating the need for manual media queries.",
    link: "#responsive-grid",
    previewHtml: `
      <div class="w-full min-h-32 h-full bg-background  p-2">
          <div class="flex flex-wrap gap-2 w-full h-full">
              <div class="flex-1 min-w-[70px] bg-secondary h-full"></div>
              <div class="flex-1 min-w-[70px] bg-secondary h-full"></div>
              <div class="flex-1 min-w-[70px] bg-secondary h-full"></div>
          </div>
      </div>
    `,
  },
  {
    title: "CSS Gradient Generator",
    description: "Craft beautiful linear, radial, and conic gradients with multiple color stops and directions.",
    link: "#gradient",
    previewHtml: `
      <div class="w-full min-h-32 h-full " style="background: linear-gradient(to right, oklch(0.5004 0.2298 270.49), oklch(0.4128 0.2103 292.04));"></div>
    `,
  },
  {
    title: "Border Radius Customizer",
    description: "Fine-tune individual border radii for unique and custom shapes.",
    link: "#border-radius",
    previewHtml: `
      <div class="w-full min-h-32 h-full bg-background  flex items-center justify-center">
          <div class="w-24 h-24 bg-accent rounded-2xl" style="border-radius: 30px 5px 50px 10px;"></div>
      </div>
    `,
  },
  {
    title: "CSS Filter Playground",
    description: "Apply various CSS filters to images and elements with live preview.",
    link: "#filter",
    previewHtml: `
      <div class="w-full min-h-32 h-full bg-background  flex items-center justify-center">
          <img src="https://placehold.co/100x100/oklch(0.5004 0.2298 270.49)/oklch(0.9823 0.1275 288.17)?text=IMG" alt="Filtered Image" class="w-24 h-24  object-cover" style="filter: grayscale(80%) brightness(120%);">
      </div>
    `,
  },
];