
function getSettingRenderSettings(id, format) {
    var rqItem1_spec_str = app.project.renderQueue.item(1).getSettings(format);
    var rqItem1_spec_str_json = rqItem1_spec_str.toSource();
    alert("Render Settings:\n" + format + "\n" + rqItem1_spec_str_json);
}


function getOutputSettings(index, format) {
    var rqItem1_spec_str = app.project.renderQueue.item(index).getSettings(format);
    var rqItem1_spec_str_json = rqItem1_spec_str.toSource();
    alert("Output Module Settings:\n" + format + "\n" + rqItem1_spec_str_json);
}
// GetSettingsFormat.SPEC
// GetSettingsFormat.STRING
// GetSettingsFormat.NUMBER
// GetSettingsFormat.STRING_SETTABLE
// GetSettingsFormat.NUMBER_SETTABLE

if (app.project.renderQueue.numItems > 0) {

    var settings = app.project.renderQueue.item(2).outputModule(1).getSettings(GetSettingsFormat.STRING);
    var settings_string = settings.toSource();
    alert("Settings:\n" + settings_string);
} else {
    alert("no items in queue")
}

// ({ "Audio Bit Depth": 2, "Audio Channels": 2, "Audio Sample Rate": 48000, Channels: 0, Color: 1, Crop: false, "Crop Bottom": 0, "Crop Left": 0, "Crop Right": 0, "Crop Top": 0, Depth: 24, Format: 2, "Include Project Link": true, "Include Source XMP Metadata": false, "Lock Aspect Ratio": true, "Output Audio": 3, "Output File Info": { "Full Flat Path": "/Users/kevincoleman/Library/git/nexrender/RENDER FB POST.mp4", "Base Path": "/Users/kevincoleman/Library/git/nexrender", "Subfolder Path": "", "File Name": "RENDER FB POST.mp4", "File Template": "RENDER FB POST.mp4" }, "Post-Render Action": 0, Resize: false, "Resize Quality": 1, "Resize to": { x: 3840, y: 2160 }, "Starting #": 92, "Use Comp Frame Number": true, "Use Region of Interest": false, "Video Output": true })

//

// ({
    // "Audio Bit Depth": {
        // "type": "int",
        // "enums": {
            // "8 Bit": 1,
            // "16 Bit": 2,
            // "32 Bit": 4
        // },
        // "enums-reverse": {
            // "1": "8 Bit",
            // "2": "16 Bit",
            // "4": "32 Bit"
        // },
        // "range": [
            // 1,
            // 4
        // ]
    // },
    // "Audio Channels": {
        // "type": "int",
        // "enums": {
            // "Mono": 1,
            // "Stereo": 2
        // },
        // "enums-reverse": {
            // "1": "Mono",
            // "2": "Stereo"
        // },
        // "range": [
            // 1,
            // 2
        // ]
    // },
    // "Audio Sample Rate": {
        // "type": "int",
        // "enums": {
            // "16.000 kHz": 16000,
            // "22.050 kHz": 22050,
            // "24.000 kHz": 24000,
            // "32.000 kHz": 32000,
            // "44.100 kHz": 44100,
            // "48.000 kHz": 48000
        // },
        // "enums-reverse": {
            // "16000": "16.000 kHz",
            // "22050": "22.050 kHz",
            // "24000": "24.000 kHz",
            // "32000": "32.000 kHz",
            // "44100": "44.100 kHz",
            // "48000": "48.000 kHz"
        // },
        // "range": [
            // 16000,
            // 48000
        // ]
    // },
    // "Channels": {
        // "type": "int",
        // "enums": {
            // "RGB": 0,
            // "RGB + Alpha": 1,
            // "Alpha": 2
        // },
        // "enums-reverse": {
            // "0": "RGB",
            // "1": "RGB + Alpha",
            // "2": "Alpha"
        // },
        // "range": [
            // 0,
            // 2
        // ]
    // },
    // "Color": {
        // "type": "int",
        // "enums": {
            // "Straight (Unmatted)": 0,
            // "Premultiplied (Matted)": 1
        // },
        // "enums-reverse": {
            // "0": "Straight (Unmatted)",
            // "1": "Premultiplied (Matted)"
        // },
        // "range": [
            // 0,
            // 1
        // ]
    // },
    // "Crop": {
        // "type": "bool"
    // },
    // "Crop Bottom": {
        // "type": "int"
    // },
    // "Crop Left": {
        // "type": "int"
    // },
    // "Crop Right": {
        // "type": "int"
    // },
    // "Crop Top": {
        // "type": "int"
    // },
    // "Depth": {
        // "type": "int",
        // "enums": {
            // "Floating Point Gray": -32,
            // "256 Colors": 8,
            // "Millions of Colors": 24,
            // "Millions of Colors+": 32,
            // "256 Grays": 40,
            // "Trillions of Colors": 48,
            // "Trillions of Colors+": 64,
            // "Floating Point": 96,
            // "Floating Point+": 128
        // },
        // "enums-reverse": {
            // "-32": "Floating Point Gray",
            // "8": "256 Colors",
            // "24": "Millions of Colors",
            // "32": "Millions of Colors+",
            // "40": "256 Grays",
            // "48": "Trillions of Colors",
            // "64": "Trillions of Colors+",
            // "96": "Floating Point",
            // "128": "Floating Point+"
        // },
        // "range": [
            // -32,
            // 128
        // ]
    // },
    // "Format": {
        // "type": "int",
        // "enums": {
            // "AIFF": 0,
            // "DPX/Cineon Sequence": 1,
            // "H.264": 2,
            // "IFF Sequence": 3,
            // "JPEG Sequence": 4,
            // "MP3": 5,
            // "OpenEXR Sequence": 6,
            // "PNG Sequence": 7,
            // "Photoshop Sequence": 8,
            // "QuickTime": 9,
            // "Radiance Sequence": 10,
            // "SGI Sequence": 11,
            // "TIFF Sequence": 12,
            // "Targa Sequence": 13,
            // "WAV": 14
        // },
        // "enums-reverse": {
            // "0": "AIFF",
            // "1": "DPX/Cineon Sequence",
            // "2": "H.264",
            // "3": "IFF Sequence",
            // "4": "JPEG Sequence",
            // "5": "MP3",
            // "6": "OpenEXR Sequence",
            // "7": "PNG Sequence",
            // "8": "Photoshop Sequence",
            // "9": "QuickTime",
            // "10": "Radiance Sequence",
            // "11": "SGI Sequence",
            // "12": "TIFF Sequence",
            // "13": "Targa Sequence",
            // "14": "WAV"
        // },
        // "range": [
            // 0,
            // 14
        // ]
    // },
    // "Include Project Link": {
        // "type": "bool"
    // },
    // "Include Source XMP Metadata": {
        // "type": "bool"
    // },
    // "Lock Aspect Ratio": {
        // "type": "bool"
    // },
    // "Output Audio": {
        // "type": "int",
        // "enums": {
            // "Off": 1,
            // "On": 2,
            // "Auto": 3
        // },
        // "enums-reverse": {
            // "1": "Off",
            // "2": "On",
            // "3": "Auto"
        // },
        // "range": [
            // 1,
            // 3
        // ]
    // },
    // "Output File Info": {
        // "type": {
            // "Full Flat Path": "string",
            // "Base Path": "string",
            // "Subfolder Path": "string",
            // "File Name": "string",
            // "File Template": "string"
        // }
    // },
    // "Post-Render Action": {
        // "type": "int",
        // "enums": {
            // "None": 0,
            // "Import": 1,
            // "Import & Replace Usage": 2,
            // "Set Proxy": 3
        // },
        // "enums-reverse": {
            // "0": "None",
            // "1": "Import",
            // "2": "Import & Replace Usage",
            // "3": "Set Proxy"
        // },
        // "range": [
            // 0,
            // 3
        // ]
    // },
    // "Resize": {
        // "type": "bool"
    // },
    // "Resize Quality": {
        // "type": "int",
        // "enums": {
            // "Low": 0,
            // "High": 1
        // },
        // "enums-reverse": {
            // "0": "Low",
            // "1": "High"
        // },
        // "range": [
            // 0,
            // 1
        // ]
    // },
    // "Resize to": {
        // "type": "{\"x\": <int>, \"y\": <int>}",
        // "enums": {
            // "Cineon Full  \u2022  3656x2664 \u2022 24 fps": "3656,2664",
            // "Cineon Half  \u2022  1828x1332 \u2022 24 fps": "1828,1332",
            // "Custom": "x,y",
            // "Custom2": "{\"x\": <x_val>, \"y\": <y_val>}",
            // "Custom3": "[<x_val>,<y_val>]",
            // "DVCPRO HD  \u2022  1280x1080 (1.5) \u2022 29.97 fps": "1280,1080",
            // "DVCPRO HD  \u2022  1440x1080 (1.33) \u2022 25 fps": "1440,1080",
            // "DVCPRO HD  \u2022  960x720 (1.33) \u2022 23.976 fps": "960,720",
            // "DVCPRO HD  \u2022  960x720 (1.33) \u2022 25 fps": "960,720",
            // "DVCPRO HD  \u2022  960x720 (1.33) \u2022 29.97 fps": "960,720",
            // "Film (2K)  \u2022  2048x1556 \u2022 24 fps": "2048,1556",
            // "Film (4K)  \u2022  4096x3112 \u2022 24 fps": "4096,3112",
            // "HD  \u2022  1920x1080 \u2022 24 fps": "1920,1080",
            // "HD  \u2022  1920x1080 \u2022 25 fps": "1920,1080",
            // "HD  \u2022  1920x1080 \u2022 29.97 fps": "1920,1080",
            // "HDV  \u2022  1440x1080 (1.33) \u2022 25 fps": "1440,1080",
            // "HDV  \u2022  1440x1080 (1.33) \u2022 29.97 fps": "1440,1080",
            // "HDV/HDTV  \u2022  1280x720 \u2022 25 fps": "1280,720",
            // "HDV/HDTV  \u2022  1280x720 \u2022 29.97 fps": "1280,720",
            // "Social Media Landscape  \u2022  1280x720 \u2022 30 fps": "1280,720",
            // "Social Media Landscape HD  \u2022  1920x1080 \u2022 30 fps": "1920,1080",
            // "Social Media Portrait  \u2022  720x1280 \u2022 30 fps": "720,1280",
            // "Social Media Portrait HD  \u2022  1080x1920 \u2022 30 fps": "1080,1920",
            // "Social Media Square  \u2022  1080x1080 \u2022 30 fps": "1080,1080",
            // "UHD (4K)  \u2022  3840x2160 \u2022 23.976 fps": "3840,2160",
            // "UHD (4K)  \u2022  3840x2160 \u2022 25 fps": "3840,2160",
            // "UHD (4K)  \u2022  3840x2160 \u2022 29.97 fps": "3840,2160",
            // "UHD (8K)  \u2022  7680x4320 \u2022 23.976 fps": "7680,4320"
        // },
        // "enums-reverse": {
            // "3656,2664": "Cineon Full  •  3656x2664 • 24 fps",
            // "1828,1332": "Cineon Half  •  1828x1332 • 24 fps",
            // "x,y": "Custom",
            // "{\"x\": <x_val>, \"y\": <y_val>}": "Custom2",
            // "[<x_val>,<y_val>]": "Custom3",
            // "1280,1080": "DVCPRO HD  •  1280x1080 (1.5) • 29.97 fps",
            // "1440,1080": "HDV  •  1440x1080 (1.33) • 29.97 fps",
            // "960,720": "DVCPRO HD  •  960x720 (1.33) • 29.97 fps",
            // "2048,1556": "Film (2K)  •  2048x1556 • 24 fps",
            // "4096,3112": "Film (4K)  •  4096x3112 • 24 fps",
            // "1920,1080": "Social Media Landscape HD  •  1920x1080 • 30 fps",
            // "1280,720": "Social Media Landscape  •  1280x720 • 30 fps",
            // "720,1280": "Social Media Portrait  •  720x1280 • 30 fps",
            // "1080,1920": "Social Media Portrait HD  •  1080x1920 • 30 fps",
            // "1080,1080": "Social Media Square  •  1080x1080 • 30 fps",
            // "3840,2160": "UHD (4K)  •  3840x2160 • 29.97 fps",
            // "7680,4320": "UHD (8K)  •  7680x4320 • 23.976 fps"
        // }
    // },
    // "Starting #": {
        // "type": "int"
    // },
    // "Use Comp Frame Number": {
        // "type": "bool"
    // },
    // "Use Region of Interest": {
        // "type": "bool"
    // },
    // "Video Output": {
        // "type": "bool"
    // }
// })
