module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  rules: {
    "property-no-vendor-prefix": null,
    // "font-family-name-quotes": null,
    "font-family-no-missing-generic-family-keyword": true,
    "custom-property-empty-line-before": null,
    "comment-empty-line-before": null,
    "rule-empty-line-before": null,
  },
};
