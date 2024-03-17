/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // <=== enables static exports
  // reactStrictMode: true,

  // async redirects() {
  //   return [
  //     {
  //       source: "/404",
  //       destination: "/", // Matched parameters can be used in the destination
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
