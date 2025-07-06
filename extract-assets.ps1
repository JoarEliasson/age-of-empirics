param(
  [string]$GamePath = "C:\Program Files (x86)\Steam\steamapps\common\Age of Empires IV\",
  [string]$EssenceDir = "./tools/AOEMods.Essence"
)

# 1) Unpack unit/building data
dotnet "$EssenceDir/AOEMods.Essence.CLI.dll" sga-unpack "$GamePath/cardinal/archives/Attrib.sga" "./source/attrib-raw"

# 2) Decode RGD → JSON
dotnet "$EssenceDir/AOEMods.Essence.CLI.dll" rgd-decode "./source/attrib-raw" "./source/attrib" -b -f json

# 3) Unpack UI art/icons
dotnet "$EssenceDir/AOEMods.Essence.CLI.dll" sga-unpack "$GamePath/cardinal/archives/UIArt.sga" "./source/uiart-raw"

# 4) Decode RRTeX → PNG
dotnet "$EssenceDir/AOEMods.Essence.CLI.dll" rrtex-decode "./source/uiart-raw/ui/icons" "./source/ui/icons" -b

# Run with 'npm run extract-assets'