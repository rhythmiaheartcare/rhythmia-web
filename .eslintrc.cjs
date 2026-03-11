module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'warn',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
    // Allow R3F (React Three Fiber) custom JSX properties
    'react/no-unknown-property': ['error', {
      ignore: [
        'position', 'rotation', 'geometry', 'args',
        'emissive', 'emissiveIntensity', 'wireframe', 'transparent',
        'side', 'intensity', 'roughness', 'metalness', 'transmission',
        'thickness', 'ior', 'map', 'castShadow', 'angle', 'penumbra',
        'object', 'dispose', 'attach',
      ]
    }],
  },
}
