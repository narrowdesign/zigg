module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-functions')({
      functions: {
        flux(min, max, screenMin = '420px', screenMax = '1920px') {
          const spread = parseInt(max,10) - parseInt(min,10);
          const screenSpread = parseInt(screenMax,10) - parseInt(screenMin,10);
          let css = `calc(${min} + ${spread} * (100vw - ${screenMin}) / ${screenSpread})`;
          return css
        },
        clamp(min, max, screenMin = '420px', screenMax = '1920px') {
          const spread = parseInt(max,10) - parseInt(min,10);
          const screenSpread = parseInt(screenMax,10) - parseInt(screenMin,10);
          let css = `calc(${min} + ${spread} * (100vw - ${screenMin}) / ${screenSpread})`;
          return css
        }
      }
    }),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
  ]
}