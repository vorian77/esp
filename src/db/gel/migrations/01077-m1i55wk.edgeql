CREATE MIGRATION m1i55wkaeo36nilm32vgyr55cd3wcojq6lwvvbbuzbyaw5evjzn4ua
    ONTO m15g5qr6qudozgd6l7blpe3gbnjydcgesjj5rlsokjbmmkqkzols2a
{
  ALTER TYPE sys_core::SysMsg {
      CREATE REQUIRED PROPERTY isForward: std::bool {
          SET default := false;
      };
  };
};
