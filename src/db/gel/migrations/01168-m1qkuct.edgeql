CREATE MIGRATION m1qkuctf3c5tpwpdwtnlurlpg352yann2ozqamqsfln67cbs43cwlq
    ONTO m1z7nyogglyf37bto4p6iswjy6hh6ai5ypdbi6xhtqem4re7hcyzuq
{
  ALTER TYPE sys_core::SysMsg {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET readonly := true;
          SET REQUIRED USING (<std::datetime>{});
      };
  };
};
