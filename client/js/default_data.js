function single_seattle_weather_data() {
    return {
        "data": {"url": "https://vega.github.io/vega-lite/data/seattle-weather.csv"},
        "mark": "line",
        "encoding": {
            "x": {
                "timeUnit": "month",
                "field": "date",
                "type": "temporal",
                "bin": false,
            },
            "y": {
                "aggregate": "mean",
                "field": "precipitation",
                "type": "quantitative",
                "bin": false,
            }
        }
    };
}

