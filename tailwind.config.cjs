/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    // activar modo oscuro
    darkMode: 'class', // or 'media' or 'class'

    theme: {
        extend: {
            fontFamily: {
              mulish: ['Mulish', 'sans-serif'],
              playfair: ['Playfair Display', 'sans-serif'],
              roboto: ['Roboto', 'sans-serif'],      
            },
            colors:{

				'devarana-background':'#F3F6F9',
				'devarana-blue' : '#56739B',
				'devarana-babyblue' : '#a9c0e4',
				'devarana-pink' : '#d64767',
				'devarana-midnight' : '#242a38',
				'devarana-hazelnut' : '#eadfd4',
				'devarana-pearl' : '#f9f9f7',
				'devarana-graph' : '#848891',
				'devarana-dark-graph' : '#656A76',
				'devarana-pollito' : '#ffdea4',
				'devarana-salmon' : '#fabcab',

				'primary': '#0967C9',
				'secondary': '#E51141',
				'success': '#11C31C',
				'info': '#F09814',
				'warning': '#F0E438',
				'error': '#CB0007',
				'dark': '#2E3136',
				'default': '#A6AFC3',

				'primary-light': '#408FE3',
				'secondary-light': '#FF6E8F',
				'success-light': '#75DD7B',
				'info-light': '#F3B860',
				'warning-light': '#F3ED90',
				'error-light': '#EC4D49',
				'dark-light': '#656A76',
				'default-light': '#F9F9F7',

            },
            fontSize: {
              base: ['14px', '24px'],
            },
            transitionProperty: {
                'height': 'height',
                'width': 'width',
                'max-width': 'max-width',
                'objectPosition': 'objectPosition',
                'backgroundColor': 'background-color',
            },
            borderRadius: {
              'ext' : '10px'
            },
            boxShadow: {
              'ext' : 'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem'
            },
            backgroundImage:{
              'login': "url('./assets/img/background/Devarana-Website.webp')",
              // watermark 
              'w-isotipo': "url('./assets/img/watermark/Devarana.svg')",
              'w-logotipo': "url('./assets/img/watermark/Logotipo.svg')",
              'w-proposito': "url('./assets/img/watermark/proposito.svg')",
              'w-mision': "url('./assets/img/watermark/mision.svg')",
              'w-vision': "url('./assets/img/watermark/Futuro.svg')",
              'w-legendario': "url('./assets/img/watermark/ServicioLegendario.svg')",
              'dark-gradient' : 'linear-gradient(190deg, #656a76 0%, #2e3136 50%, #2e3136 100%)'
            }
            
          },
    },
    plugins: [],
}
