import { useState, useEffect, useCallback } from 'react';

export function useEditorState(storageKey, defaultData, initialZoom = 1.0, fitWidthRatio = 800) {
    const [data, setData] = useState(defaultData);
    const [isLoaded, setIsLoaded] = useState(false);
    const [zoom, setZoom] = useState(initialZoom);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch (e) {
                console.error(`Failed to parse saved data for ${storageKey}`, e);
            }
        }
        setIsLoaded(true);
        setTimeout(() => handleFit(), 100); // Fit on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(storageKey, JSON.stringify(data));
        }
    }, [data, isLoaded, storageKey]);

    // Field Updaters
    const updateField = (path, value) => {
        const keys = path.split('.');
        setData(prev => {
            const newData = { ...prev };
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const updateArrayItem = (path, index, value) => {
        const keys = path.split('.');
        setData(prev => {
            const newData = { ...prev };
            let current = newData;
            for (let i = 0; i < keys.length; i++) {
                current = current[keys[i]];
            }
            current[index] = value;
            return newData;
        });
    };

    const updateObjectArrayItem = (path, index, field, value) => {
        const keys = path.split('.');
        setData(prev => {
            const newData = { ...prev };
            let current = newData;
            for (let i = 0; i < keys.length; i++) {
                current = current[keys[i]];
            }
            current[index] = { ...current[index], [field]: value };
            return newData;
        });
    };

    // Actions
    const handleFit = useCallback(() => {
        // Attempt to find the preview wrapper width, default to window width minus sidebar
        const wrapper = document.getElementById('editor-preview-wrapper');
        const availableWidth = wrapper ? wrapper.clientWidth : (window.innerWidth - 400);
        // Add some padding/margin roughly
        const padding = 120; // 60px padding * 2
        const safeWidth = availableWidth - padding;

        const fitScale = Math.min(Math.max(safeWidth / fitWidthRatio, 0.4), 1.5);
        setZoom(fitScale);
    }, [fitWidthRatio]);

    const handlePrint = () => {
        window.print();
    };

    const handleReset = () => {
        if (window.confirm("Are you sure? This will erase all your changes.")) {
            setData(defaultData);
        }
    };

    const handleExport = (filename) => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || `rhythmia-export-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (window.confirm("This will overwrite your current changes. Continue?")) {
                    setData(importedData);
                }
            } catch (error) {
                console.error("Import failed", error);
                alert("Failed to load file. Invalid JSON.");
            }
        };
        reader.readAsText(file);
    };

    return {
        data,
        isLoaded,
        updateField,
        updateArrayItem,
        updateObjectArrayItem,
        zoomState: { zoom, setZoom, handleFit },
        actions: { handlePrint, handleReset, handleExport, handleImport }
    };
}
