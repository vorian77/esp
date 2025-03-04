CREATE MIGRATION m1lodjpzamkvvnkpm4u73eexp2e7hxmdbrhoro7geictvvhaiculdq
    ONTO m1mm6t4uircswmz5tr3rvdy4wcewhrz3rpjkqxxuyfarhjd6rnnefq
{
              ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY isDisplay: std::bool;
  };
};
