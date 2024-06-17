CREATE MIGRATION m1gkcrsnbgr4fpqseu7yyhjsbichzuuwc633nse3fr7msnma22t4sa
    ONTO m1mdt25qtxtuti34w3i4m35twowg3ipoul6i4wia2d6hhqqlyjdmea
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY isAlwaysRetrieveData {
          SET REQUIRED USING (<std::bool>{});
      };
      ALTER PROPERTY isAlwaysRetrieveDataObject {
          SET REQUIRED USING (<std::bool>{});
      };
      ALTER PROPERTY isListEdit {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
