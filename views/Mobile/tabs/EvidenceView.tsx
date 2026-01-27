
import React, { useState, useRef } from 'react';

const EvidenceView: React.FC = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">倾倒取证拍照</h2>
        <p className="text-slate-500 text-sm mt-1">到达指定卸货区后拍照留痕</p>
      </div>

      {/* Capture Area */}
      <div className="flex-1 min-h-[300px] bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 relative overflow-hidden flex flex-col items-center justify-center group transition-all hover:border-blue-400">
        {capturedImage ? (
          <div className="relative w-full h-full">
            <img src={capturedImage} alt="Evidence" className="w-full h-full object-cover" />
            <button 
                onClick={() => setCapturedImage(null)}
                className="absolute top-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md"
            >✕</button>
            {/* Geo Tag Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-sm p-3 rounded-xl text-white text-[10px]">
                <p>📍 地理位置: 南京市滨江固废消纳中心 3号库</p>
                <p>⏰ 时间: {new Date().toLocaleString()}</p>
                <p>🆔 工单: WO-20231027-001</p>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 space-y-4">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-3xl">📷</div>
             <p className="text-slate-400 text-sm">点击下方按钮或此区域拍摄</p>
          </div>
        )}
      </div>

      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={onFileChange}
      />

      {/* Action Buttons */}
      <div className="space-y-3">
        {!capturedImage ? (
            <button 
                onClick={handleCapture}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
            >
                立即拍照
            </button>
        ) : (
            <button 
                onClick={() => alert('上传成功！')}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-200 active:scale-95 transition-transform"
            >
                确认并提交
            </button>
        )}
        <p className="text-center text-xs text-slate-400">注：系统将自动获取实时经纬度，伪造无效</p>
      </div>
    </div>
  );
};

export default EvidenceView;
