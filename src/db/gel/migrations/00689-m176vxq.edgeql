CREATE MIGRATION m176vxq2kyb52azbrzxjtpd6zfi5adalsyyob6pgozwrqm36cf5tfa
    ONTO m1e75yd2jt3ydtqeq7flitzpig24vkm7r643gbsupgi3pviplxtbzq
{
              ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY isSystemRootNode: std::bool;
  };
};
