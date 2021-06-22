//Inicialização e exposição do serviço Hana
using db as config from '../db/schema';

//@requires: 'authenticated-user'

//@(path : '/lib/xsodata/api.xsodata')
service userService {
    entity accdocusign      as projection on config.ACCDOCUSIGN;
    entity acc_applications as projection on config.ACC_APPLICATIONS;
    entity user_apps        as projection on config.USER_APPS;
}