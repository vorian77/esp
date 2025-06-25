CREATE MIGRATION m1febqxmcommiomgs3w3t4pyqi5dliwdtu3kjegxgiv642qju3wyja
    ONTO m1r4d3zouf2ingrznamw22otuvy4smvblcwi4hyshv2zsqxmyospqa
{
  ALTER TYPE sys_core::SysNodeObj {
      DROP LINK parent;
  };
};
