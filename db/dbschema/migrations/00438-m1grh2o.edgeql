CREATE MIGRATION m1grh2oxusadkxafnavdjwkfhsbag3jfm6bbnmrzfmjcocybbgvpuq
    ONTO m1wlulsvbqbbyhqhivfyqho6froglico4gsvrdvfbpnomcva24iojq
{
  ALTER TYPE sys_rep::SysRepEl {
      ALTER PROPERTY indexSort {
          RENAME TO orderSort;
      };
  };
};
