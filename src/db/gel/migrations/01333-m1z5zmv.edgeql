CREATE MIGRATION m1z5zmvsghqopxbf56v3mnt3j2rk57xrydmkbb3n56zdqzwyfpxqha
    ONTO m17gvjgynbbyodwhbwm3nnayouizclutdnex32nvpwjgh7ehp62qra
{
  ALTER TYPE sys_core::SysMsg {
      ALTER LINK recipients {
          SET TYPE sys_core::ObjRoot;
      };
  };
};
