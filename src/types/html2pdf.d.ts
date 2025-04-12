declare module 'html2pdf.js' {
  interface Options {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: {
      scale?: number;
      useCORS?: boolean;
      logging?: boolean;
    };
    jsPDF?: {
      unit?: string;
      format?: string;
      orientation?: string;
    };
    pagebreak?: {
      mode?: string;
      before?: string[];
      after?: string[];
      avoid?: string[];
    };
  }

  interface HTML2PDF {
    set: (options: Options) => HTML2PDF;
    from: (element: HTMLElement) => HTML2PDF;
    save: () => Promise<void>;
    output: (type: string, options?: any) => Promise<any>;
  }

  function html2pdf(): HTML2PDF;
  function html2pdf(element: HTMLElement, opts?: Options): HTML2PDF;

  export default html2pdf;
}