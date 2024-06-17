CREATE MIGRATION m1xyqybyffkedaxgchjhqatl24lunnntbgsnwwwl7cifcnmrirouqa
    ONTO m1t5mso6lbymyxxxwb6v3fqenllv7x5m3ckf37yna7oeq73z7xldsq
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER PROPERTY order {
          SET default := 1000;
      };
  };
};
