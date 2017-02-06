// Y axis object
let y_axis = {
    'title': "Y Axis Title",
};

// Y Axis Configuration
let encoding_y = {
    "aggregate": "count",
    "field": "*",
    "type": "quantitative",
    "axis": y_axis
};

// X Axis Configuration
let encoding_x = {
    "bin": true,
    "field": "precipitation",
    "type": "quantitative",
    "axis": {
        'title': 'X Axis Title!'
    }
};

// Overall Vega Spec
let vega_spec = {
    "data": {"url": "https://vega.github.io/vega-lite/data/seattle-weather.csv"},
    "mark": "bar",
    "encoding": {
        "x": encoding_x,
        "y": encoding_y
    }
};

function redo_vega() {
    let embed_spec = {
        mode: "vega-lite",  // Instruct Vega-Embed to use the Vega-Lite compiler
        spec: vega_spec
        // You can add more vega-embed configuration properties here.
        // See https://github.com/vega/vega/wiki/Embed-Vega-Web-Components#configuration-propeties for more information.
    };

    // Embed the visualization in the container with id `vis`
    vg.embed("#vis", embed_spec, function(error, result) {
        // Callback receiving the View instance and parsed Vega spec
        // result.view is the View, which resides under the '#vis' element
    });
}

redo_vega();

// Y axis data manifest
let y_axis_manifest = {
    // Defaults
    data: {
        'title': y_axis.title,
    },

    // Init function
    init: function ($node, runtime) {
        $node.html(
            '<label for="y_axis_title">Y Axis Title</label>' +
            '<input type="text" class="form-control" id="y_axis_title">'
        );
    },

    // Bindings
    ui: {
        "#y_axis_title": {
            bind: function(data, value, $control) {
                if (value != null && value.length > 0) {
                    data.title = value;
                }
                redo_vega();
                return data.title;
            }
        },
    }
};

// Apply two way binding.
$("#y_axis_title_div").my( y_axis_manifest, y_axis );
