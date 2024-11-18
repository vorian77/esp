CREATE MIGRATION m17c2nljnqbenmyb7jj6n23c5ebdmmf24s7osut6tsvsjw3opwsora
    ONTO m1ilpsd7enpkeujfse4y3benrrszr6osruhfjzhhpcuojcaifodx2q
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY isRetrievedPrevent: std::bool;
  };
};
