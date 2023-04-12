

export const editorConfiguration = {
        toolbar:  {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                '|',
            ],
        },
        heading: {
            options: [
                { model: 'paragraph', title: 'Párrafo', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Encabezado 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Encabezado 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Encabezado 3', class: 'ck-heading_heading3' },
            ]
        },
        language: 'es',
    }