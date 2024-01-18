declare module "@/util/particle.js" {
  const createParticle: (
    dom: string,
    options: {
      count: number;
      color: string;
      radius: number[];
      distance: number;
      line: boolean;
      speed: number;
      bounce: boolean;
      resize: boolean;
    }
  ) => void;
  export default createParticle;
}
