$(document).ready(function(){
    $('#load_btn').on('click', function(e) {
        $('#load_saved_div').show();
    })

    $('#load_sub_btn').on('click', function(e) {
        redo_vega(JSON.parse($('#load_saved_ta').val()))
        $('#load_saved_div').hide();
    });


    // jQuery elements that won't change.
    let vega_form = $('#vega_form')
        ,update_graph_button = $('#update_graph_button')
        ,new_actions_span = $('#new_actions_span')
        ,vis_div = $('#vis');

    let initial_spec = single_seattle_weather_data();

    function redo_vega(spec) {
        let embed_spec = {
            mode: "vega-lite",  // Instruct Vega-Embed to use the Vega-Lite compiler
            spec: spec
        };

        let current_height = vis_div.css('height');
        vis_div.css('min-height', current_height);

        // Embed the visualization in the container with id `vis`
        vg.embed("#vis", embed_spec, function(error, result) {
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

    vega_form.on('submit', function (e) {
       e.preventDefault();
    });

    redo_vega(initial_spec);

    $('#vega_form').jsonForm({
        schema: {
            data: {
                type: "object",
                title: "Data",
                properties: {
                    url: {
                        type: "string",
                        title: "Data URL",
                        default: initial_spec.data.url,
                    }
                },
            },
            mark: {
                type: 'string',
                title: 'Mark Type',
                enum: ['area', 'bar', 'tick', 'text', 'circle', 'square', 'line', 'point'],
                default: initial_spec.mark,
            },
            encoding: {
                default: initial_spec.encoding,
                type: "object",
                title: "Encoding",
                properties: {
                    x: {
                        type: "object",
                        title: "X Axis",
                        properties: {
                            enabled: {
                                type: 'boolean',
                                title: 'X Axis Enabled',
                                default: true,
                            },
                            field: {
                                type: "string",
                                title: "Field (from CSV)",
                                default: initial_spec.encoding.x.field,
                            },
                            bin: {
                                type: "boolean",
                                title: "Discretize Data"  ,
                                default: initial_spec.encoding.x.bin,
                            },
                            type: {
                                type: 'string',
                                title: 'Field Type',
                                enum: ['quantitative', 'temporal', 'ordinal', 'nominal'],
                                default: initial_spec.encoding.x.type,
                            },
                            timeUnit: {
                                type: "string",
                                title: "Time Unit (for 'Temporal' field type)",
                                enum: ["none", "date", "day", "hours", "hoursminutes", "hoursminutesseconds", "milliseconds", "minutes", "minutesseconds", "month", "monthdate", "quarter", "quartermonth", "seconds", "secondsmilliseconds", "year", "yearmonth", "yearmonthdate", "yearmonthdatehours", "yearmonthdatehoursminutes", "yearmonthdatehoursminutesseconds", "yearquarter", "yearquartermonth" ],
                                default: initial_spec.encoding.x.timeUnit,
                            },
                            aggregate: {
                                type: "string",
                                title: "Aggregate Function",
                                enum: ["none", "argmax", "argmin", "average", "count", "distinct", "max", "mean", "median", "min", "missing", "modeskew", "q1", "q3", "stdev", "stdevp", "sum", "valid", "values", "variance", "variancep" ],
                                default: initial_spec.encoding.x.aggregate,
                            },
                        }
                    },
                    y: {
                        type: "object",
                        title: "Y Axis",
                        properties: {
                            enabled: {
                                type: 'boolean',
                                title: 'Y Axis Enabled',
                                default: true,
                            },
                            field: {
                                type: "string",
                                title: "Field (from CSV)",
                                default: initial_spec.encoding.y.field,
                            },
                            bin: {
                                type: "boolean",
                                title: "Discretize Data"  ,
                                default: initial_spec.encoding.y.bin,
                            },
                            type: {
                                type: 'string',
                                title: 'Field Type',
                                enum: ['quantitative', 'temporal', 'ordinal', 'nominal'],
                                default: initial_spec.encoding.y.type,
                            },
                            timeUnit: {
                                type: "string",
                                title: "Time Unit (for 'Temporal' field type)",
                                enum: ["none", "date", "day", "hours", "hoursminutes", "hoursminutesseconds", "milliseconds", "minutes", "minutesseconds", "month", "monthdate", "quarter", "quartermonth", "seconds", "secondsmilliseconds", "year", "yearmonth", "yearmonthdate", "yearmonthdatehours", "yearmonthdatehoursminutes", "yearmonthdatehoursminutesseconds", "yearquarter", "yearquartermonth" ],
                                default: initial_spec.encoding.y.timeUnit,
                            },
                            aggregate: {
                                type: "string",
                                title: "Aggregate Function",
                                enum: ["none", "argmax", "argmin", "average", "count", "distinct", "max", "mean", "median", "min", "missing", "modeskew", "q1", "q3", "stdev", "stdevp", "sum", "valid", "values", "variance", "variancep" ],
                                default: initial_spec.encoding.y.aggregate,
                            },
                        }
                    },
                    // color: {
                    //     type: "object",
                    //     title: "Coloring",
                    //     properties: {
                    //
                    //     }
                    // }
                }
            },
        },

        values: initial_spec,

        onSubmit: function (errors, values) {
            if (errors) {
                console.log(errors);
            }
            else {
                if (values.encoding.x.aggregate == "none") {
                    delete values.encoding.x['aggregate'];
                }
                if (values.encoding.y.aggregate == "none") {
                    delete values.encoding.y['aggregate'];
                }
                if (values.encoding.x.timeUnit == "none") {
                    delete values.encoding.x['timeUnit'];
                }
                if (values.encoding.y.timeUnit == "none") {
                    delete values.encoding.y['timeUnit'];
                }

                initial_spec = values;

                let copy = JSON.parse(JSON.stringify(initial_spec))
                if (copy.encoding.y.enabled == false) {
                    delete copy.encoding['y'];
                }
                if (copy.encoding.x.enabled == false) {
                    delete copy.encoding['x'];
                }
                redo_vega(copy);
            }
        },
    });
});

