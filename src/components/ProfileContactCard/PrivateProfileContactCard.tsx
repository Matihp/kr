function PrivateProfileContactCard() {
  return (
    <div className="w-[30vw] h-[50vh] sticky top-[250px] hidden md:block mt-6 xl:ml-4">
      <div className=" w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white md:mt-0">
          Design Tools
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 pb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
          deserunt ea doloremque natus error.
        </p>
        <div className="flex justify-center items-center mx-auto">
          <button className=" px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50 hover:bg-violet-500">
            Quiero mi certificado
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivateProfileContactCard;
