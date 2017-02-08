$(document).ready(function(){

    // jQuery elements that won't change.
    let vega_form = $('#vega_form')
        ,update_graph_button = $('#update_graph_button')
        ,new_actions_span = $('#new_actions_span')
        ,vis_div = $('#vis')
        ,x_axis_title_div = $('#x_axis_title_div')
        ,y_axis_title_div = $('#y_axis_title_div')
    ;

    let y_axis = {
        'title': "Number of Records",
    };

    let encoding_y = {
        "aggregate": "count",
        "field": "*",
        "type": "quantitative",
        "axis": y_axis,
    };

    let x_axis = {
        'title': 'BIN(precipitation)',
    };

    let encoding_x = {
        "bin": true,
        "field": "precipitation",
        "type": "quantitative",
        "axis": x_axis
    };

    let spec_data = {
        "url": "https://vega.github.io/vega-lite/data/seattle-weather.csv",
    };

    let spec_encoding = {
        "x": encoding_x,
        "y": encoding_y,
    };

    let vega_spec = {
        "data": spec_data,
        "mark": "bar",
        "encoding": spec_encoding
    };

    // This recreates the graph.
    function redo_vega() {
        let embed_spec = {
            mode: "vega-lite",  // Instruct Vega-Embed to use the Vega-Lite compiler
            spec: vega_spec
            // You can add more vega-embed configuration properties here.
            // See https://github.com/vega/vega/wiki/Embed-Vega-Web-Components#configuration-propeties for more information.
        };

        let current_height = vis_div.css('height');
        vis_div.css('min-height', current_height);

        // Embed the visualization in the container with id `vis`
        vg.embed("#vis", embed_spec, function(error, result) {
            // Callback receiving the View instance and parsed Vega spec
            // result.view is the View, which resides under the '#vis' element
            new_actions_span.empty();

            let vega_actions_div = $('.vega-actions');

            vega_actions_div.find('a').each(function(i) {
                let link = $(this).detach();
                link.addClass('btn btn-default');
                new_actions_span.append(link);
            });

            vis_div.css('min-height', '0px');
        });

    }

    // Create the graph for the first time.
    redo_vega();

    vega_form.on('submit', function(e) {
        e.preventDefault();
        redo_vega();
    });

    update_graph_button.on('click', function (e) {
        redo_vega();
    });

    // Two way binding definition for y_axis
    let y_axis_manifest = {
        data: {
            'title': y_axis.title,
        },

        init: function ($node, runtime) {
            let default_title = runtime.data.title;
            $node.html(
                `<label for="y_axis_title">Y Axis Title</label>` +
                `<input type="text" class="form-control" id="y_axis_title" value="${default_title}">`
            );
        },

        ui: {
            "#y_axis_title": {
                bind: function(data, value) {
                    if (value != null && value.length > 0) {
                        data.title = value;
                    }
                    return data.title;
                }
            },
        }
    };

    let x_axis_manifest = {
        data: {
            'title': x_axis.title,
        },

        init: function($node, runtime) {
            let default_title = runtime.data.title;
            $node.html(
                `<label for="x_axis_title">X Axis Title</label>` +
                `<input type="text" class="form-control" id="x_axis_title" value="${default_title}">`
            );
        },

        ui: {
            "#x_axis_title": {
                bind: function(data, value) {
                    if (value != null && value.length > 0) {
                        data.title = value;
                    }
                    return data.title;
                }
            },
        }
    };

// Apply two way binding.
x_axis_title_div.my( x_axis_manifest, x_axis );
y_axis_title_div.my( y_axis_manifest, y_axis );

//
});

