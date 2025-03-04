CREATE MIGRATION m1b3qfc5gypxia53nqxrzooyu57mxiygok3mj5jwvv6fmn3jnfywea
    ONTO m1xajx3fwihb7mwvy6ezrdch74cv2g7igo7yw3yevhjebobk4ouvgq
{
              ALTER TYPE sys_rep::SysRepUserParm {
      DROP PROPERTY orderDisplay;
  };
};
