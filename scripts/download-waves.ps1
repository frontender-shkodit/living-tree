$ErrorActionPreference = 'Stop'
$assetRoot = Join-Path $PSScriptRoot '../public/assets/figma'
$assets = @'
[
  {
    "file": "catalog-846.svg",
    "url": "https://www.figma.com/api/mcp/asset/28f1c6e3-18d5-4a67-a0ab-4152a79d00d5.svg"
  },
  {
    "file": "catalog-847.svg",
    "url": "https://www.figma.com/api/mcp/asset/81e1ab5e-fa6b-460c-a804-9747bf08dbdf.svg"
  },
  {
    "file": "catalog-848.svg",
    "url": "https://www.figma.com/api/mcp/asset/c6ee5978-415a-46d5-a1f1-d08b309c91c6.svg"
  },
  {
    "file": "catalog-1920.svg",
    "url": "https://www.figma.com/api/mcp/asset/fa0d634c-9f28-47dd-80ba-2594b51cbd06.svg"
  }
]
'@ | ConvertFrom-Json
foreach ($asset in $assets) {
  Invoke-WebRequest -Uri $asset.url -OutFile (Join-Path $assetRoot $asset.file) -UseBasicParsing
}
