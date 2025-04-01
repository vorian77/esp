CREATE MIGRATION m15g5qr6qudozgd6l7blpe3gbnjydcgesjj5rlsokjbmmkqkzols2a
    ONTO m1jejd6ld5pgkoqywxdtw3whk45dgzhzvro4j4xtjzujcar7ry3esa
{
  ALTER TYPE sys_core::SysNodeObj {
      CREATE MULTI LINK actions: sys_core::SysNodeObjAction {
          ON SOURCE DELETE ALLOW;
      };
  };
};
