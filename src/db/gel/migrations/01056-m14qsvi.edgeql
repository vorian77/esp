CREATE MIGRATION m14qsvimbekv63ttznby4lwudfc3ya7t4lmdfbglk62l3juxy6lrdq
    ONTO m1qljdwlv3arpkjv4mttnscogqdpyxx43nwigan342vghxupafn2vq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK codeDoAttrAccessSource {
          RENAME TO codeDoAttrAccessSources;
      };
  };
};
