import React from "react";
import { Button } from "../ui/button";

function ProfileStatsWidget() {
  return (
    <div className="flex items-center gap-10 px-4 bg-gray-50 border-2 border-gray-300 shadow-xl rounded-lg">
      <div className="flex flex-col p-2 max-w-md mx-auto ">

        <div className="flex flex-col w-20 space-y-2">
          <span className="text-sm font-bold text-gray-800">Nivel 32</span>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full"
              style={{ width: "70%" }}
            ></div>
          </div>
          <span className="text-xs text-gray-500">70%</span>
        </div>

        {/* <div className="mt-6 flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-800">Disponible</span>
        </div> */}

      </div>
      <div className="h-12 w-[1.2px]" style={{ background: 'linear-gradient(to bottom, transparent 0%, #9CA3AF 20%, #9CA3AF 80%, transparent 100%)' }} />
      <div>
        {/* <div className="mt-6 p-2 bg-blue-50 rounded-full">
          <span className="text-sm text-blue-600">
            🏆 Top 10% en JavaScript
          </span>
        </div> */}

        <div className=" flex space-x-4">
          <Button variant={"outline"} className="flex-1 px-4 ">
            Vista Pública
          </Button>
          <Button className="flex-1 px-4 ">
            Compartir Perfil
          </Button>
        </div>

      </div>
    </div>
  );
}

export default ProfileStatsWidget;
