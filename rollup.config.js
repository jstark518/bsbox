import deepcopy from "deepcopy";
import fs from "fs";
import path from "path";
import multiEntry from "rollup-plugin-multi-entry";
import sourceMaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";

const resolvedbsbox = path.resolve(__dirname, "./build/js/bsbox");

function alsoMinified(input) {
    const bundles = Array.isArray(input) ? input : [input];

    const ret = [];
    for (const bundle of bundles) {
        const copy = deepcopy(bundle);
        copy.output.file = copy.output.file.replace(/.js$/, ".min.js");
        copy.plugins.push(terser());
        ret.push(bundle, copy);
    }

    return ret;
}

function onwarn(warning, warn) {
    // This warning is not useful. Yes, this is undefined. It's always been
    // undefined.
    if (warning.code === "THIS_IS_UNDEFINED") return;

    warn(warning);
}

export default alsoMinified([{
    input: "build/js/bsbox.js",
    output: {
        file: "build/dist/bsbox.js",
        format: "umd",
        name: "bsbox",
        sourcemap: true,
        globals: {
            bootstrap: "",
        },
    },
    external: ["bootstrap"],
    plugins: [
        sourceMaps(),
    ],
    onwarn,
}, {
    input: "build/js/locales/*.js",
    output: {
        file: "build/dist/bsbox.locales.js",
        format: "umd",
        sourcemap: true,
        paths: {
            [resolvedbsbox]: "./bsbox",
        },
        globals: {
            [resolvedbsbox]: "bsbox",
        },
    },
    external: ["../bsbox"],
    plugins: [
        sourceMaps(),
        multiEntry(),
    ],
    onwarn,
}, {
    input: ["build/js/bsbox.js", "build/js/locales/*.js"],
    output: {
        file: "build/dist/bsbox.all.js",
        format: "umd",
        sourcemap: true,
        name: "bsbox",
        globals: {
            jquery: "$",
            bootstrap: "",
        },
    },
    external: ["bootstrap"],
    plugins: [
        sourceMaps(),
        multiEntry(),
    ],
    onwarn,
}, ...fs.readdirSync("build/js/locales").filter(x => /.js$/.test(x)).map(x => ({
    input: `build/js/locales/${x}`,
    output: {
        file: `build/dist/locales/${x}`,
        format: "umd",
        sourcemap: true,
        // Somehow the path for loading bsbox is messed up if this paths entry
        // is not used.
        paths: {
            [resolvedbsbox]: "../bsbox",
        },
        globals: {
            [resolvedbsbox]: "bsbox",
        },
    },
    external: ["../bsbox"],
    plugins: [
        sourceMaps(),
    ],
    onwarn,
}))]);