CREATE MIGRATION m1pawhnabmgjaxkjvofvfjtgm3ccrh4corjjfb5p5iznrpquwnzigq
    ONTO m1u7l7yc3lfrndd2n63lomrmzz53eho3etrdwku2dnctxcdvpfzkra
{
  ALTER TYPE sys_core::SysMsg {
      CREATE REQUIRED PROPERTY isClosee: std::bool {
          SET default := false;
      };
  };
};
