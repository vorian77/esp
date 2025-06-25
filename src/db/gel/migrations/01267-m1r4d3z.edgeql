CREATE MIGRATION m1r4d3zouf2ingrznamw22otuvy4smvblcwi4hyshv2zsqxmyospqa
    ONTO m17ukosnmetnpqeo6yawbxle5j2rstezwgwxfdgvecuf4xafnffiea
{
  ALTER TYPE sys_core::SysNodeObj {
      DROP LINK nodeData;
  };
  DROP TYPE sys_core::SysNodeObjData;
};
