CREATE MIGRATION m1joyk6ppzow2p5yze7eofebdkq4fdzwn5matvhki6cvchyrlfiyha
    ONTO m1yp5vh22jzv4tjekihvcxh2tywcmbrf5zzlg5slrveilei33csmjq
{
          ALTER TYPE sys_user::SysTask {
      CREATE PROPERTY exprShow: std::str;
  };
};
