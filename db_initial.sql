PGDMP  4                    |            db_stock_genius    16.3 (Debian 16.3-1.pgdg120+1)    16.2 D    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16384    db_stock_genius    DATABASE     z   CREATE DATABASE db_stock_genius WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE db_stock_genius;
                jairo    false            z          0    16737    DevolucionesApp_devolucion 
   TABLE DATA           �   COPY public."DevolucionesApp_devolucion" (state, fecha, update, id, orden, valor_total, tipo, referencia, tenant_id, usuario_id) FROM stdin;
    public          jairo    false    243   �C       |          0    16743     DevolucionesApp_motivodevolucion 
   TABLE DATA           i   COPY public."DevolucionesApp_motivodevolucion" (state, fecha, update, id, nombre, tenant_id) FROM stdin;
    public          jairo    false    245   �C       ~          0    16749 *   DevolucionesApp_relacionproductodevolucion 
   TABLE DATA           �   COPY public."DevolucionesApp_relacionproductodevolucion" (state, fecha, update, id, cantidad, valor_venta_producto, descripcion, devolucion_id, motivo_id, producto_id, tenant_id) FROM stdin;
    public          jairo    false    247   D       �          0    16879    EntradasApp_entrada 
   TABLE DATA           �   COPY public."EntradasApp_entrada" (id, state, fecha, update, orden, estado, valor, tenant_id, usuario_id, proveedor_id) FROM stdin;
    public          jairo    false    257   3D       �          0    16885    EntradasApp_pagoentrada 
   TABLE DATA           ~   COPY public."EntradasApp_pagoentrada" (state, fecha, update, id, valor, entrada_id, metodo_de_pago_id, tenant_id) FROM stdin;
    public          jairo    false    259   PD       �          0    16891    EntradasApp_proveedor 
   TABLE DATA           ~   COPY public."EntradasApp_proveedor" (state, fecha, update, id, nombre, lugar, numero_contacto, estado, tenant_id) FROM stdin;
    public          jairo    false    261   mD       �          0    16897 #   EntradasApp_relacionproductoentrada 
   TABLE DATA           �   COPY public."EntradasApp_relacionproductoentrada" (state, fecha, update, id, cantidad, valor, cantidad_devuelta, entrada_id, producto_id, tenant_id) FROM stdin;
    public          jairo    false    263   �D       �          0    16799    FinanzasApp_cierre 
   TABLE DATA           d   COPY public."FinanzasApp_cierre" (state, fecha, update, id, valor, ganancia, tenant_id) FROM stdin;
    public          jairo    false    249   �D       �          0    16805    FinanzasApp_metododepago 
   TABLE DATA              COPY public."FinanzasApp_metododepago" (state, fecha, update, id, nombre, saldo_actual, comision_banco, tenant_id) FROM stdin;
    public          jairo    false    251   �D       �          0    16811    FinanzasApp_movimientos 
   TABLE DATA           �   COPY public."FinanzasApp_movimientos" (state, fecha, update, id, referencia, tipo, valor, metodo_de_pago_id, tenant_id, usuario_id) FROM stdin;
    public          jairo    false    253   �D       �          0    16817    FinanzasApp_transferencia 
   TABLE DATA           �   COPY public."FinanzasApp_transferencia" (state, fecha, update, id, valor, descripcion, cuenta_destino_id, cuenta_origen_id, tenant_id, usuario_id) FROM stdin;
    public          jairo    false    255   �D       �          0    16969    GastosApp_gasto 
   TABLE DATA           �   COPY public."GastosApp_gasto" (state, fecha, update, id, orden, valor, descripcion, metodo_de_pago_id, tenant_id, usuario_id, tipo_gasto_id) FROM stdin;
    public          jairo    false    267   E       �          0    16963    GastosApp_tipogasto 
   TABLE DATA           \   COPY public."GastosApp_tipogasto" (state, fecha, update, id, nombre, tenant_id) FROM stdin;
    public          jairo    false    265   8E       j          0    16459    GestionDeUsuariosApp_grupos 
   TABLE DATA           P   COPY public."GestionDeUsuariosApp_grupos" (group_ptr_id, tenant_id) FROM stdin;
    public          jairo    false    227   UE       v          0    16640 *   GestionDeUsuariosApp_grupos_grupo_permisos 
   TABLE DATA           g   COPY public."GestionDeUsuariosApp_grupos_grupo_permisos" (id, grupos_id, permisosgrupo_id) FROM stdin;
    public          jairo    false    239   rE       r          0    16533 "   GestionDeUsuariosApp_permisosgrupo 
   TABLE DATA           J   COPY public."GestionDeUsuariosApp_permisosgrupo" (id, nombre) FROM stdin;
    public          jairo    false    235   �E       t          0    16541 +   GestionDeUsuariosApp_permisosgrupo_permisos 
   TABLE DATA           l   COPY public."GestionDeUsuariosApp_permisosgrupo_permisos" (id, permisosgrupo_id, permission_id) FROM stdin;
    public          jairo    false    237   �E       i          0    16452    GestionDeUsuariosApp_tenant 
   TABLE DATA           u   COPY public."GestionDeUsuariosApp_tenant" (id, nombre, direccion, telefono, email, fecha, update, state) FROM stdin;
    public          jairo    false    226   �E       l          0    16465    GestionDeUsuariosApp_usuarios 
   TABLE DATA           �   COPY public."GestionDeUsuariosApp_usuarios" (id, password, last_login, is_superuser, first_name, last_name, email, is_staff, is_active, date_joined, tenant_id) FROM stdin;
    public          jairo    false    229   �E       n          0    16475 $   GestionDeUsuariosApp_usuarios_groups 
   TABLE DATA           \   COPY public."GestionDeUsuariosApp_usuarios_groups" (id, usuarios_id, grupos_id) FROM stdin;
    public          jairo    false    231   �F       p          0    16481 .   GestionDeUsuariosApp_usuarios_user_permissions 
   TABLE DATA           j   COPY public."GestionDeUsuariosApp_usuarios_user_permissions" (id, usuarios_id, permission_id) FROM stdin;
    public          jairo    false    233   �F       x          0    16725    InventarioApp_producto 
   TABLE DATA           �   COPY public."InventarioApp_producto" (state, fecha, update, id, referencia, estilo, talla, color, cantidad, stock_min, estado, valor, valor_compra, tenant_id) FROM stdin;
    public          jairo    false    241   �F       �          0    17010    VentasApp_cliente 
   TABLE DATA           z   COPY public."VentasApp_cliente" (state, fecha, update, id, nombre, lugar, numero_contacto, estado, tenant_id) FROM stdin;
    public          jairo    false    269   G       �          0    17030    VentasApp_pagoventa 
   TABLE DATA           x   COPY public."VentasApp_pagoventa" (state, fecha, update, id, valor, metodo_de_pago_id, tenant_id, venta_id) FROM stdin;
    public          jairo    false    275   !G       �          0    17024    VentasApp_relacionproductoventa 
   TABLE DATA           �   COPY public."VentasApp_relacionproductoventa" (id, state, fecha, update, cantidad, valor_venta_producto, valor_compra, ganancia, cantidad_devuelta, producto_id, tenant_id, venta_id) FROM stdin;
    public          jairo    false    273   >G       �          0    17018    VentasApp_venta 
   TABLE DATA           �   COPY public."VentasApp_venta" (state, fecha, update, id, orden, valor_total, valor_total_ajustado, ganancia_total, ganancia_total_ajustada, cantidad_total, estado, cliente_id, tenant_id, usuario_id) FROM stdin;
    public          jairo    false    271   [G       e          0    16412 
   auth_group 
   TABLE DATA           .   COPY public.auth_group (id, name) FROM stdin;
    public          jairo    false    222   xG       g          0    16420    auth_group_permissions 
   TABLE DATA           M   COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
    public          jairo    false    224   �G       c          0    16406    auth_permission 
   TABLE DATA           N   COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
    public          jairo    false    220   �G       �          0    17096    django_admin_log 
   TABLE DATA           �   COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
    public          jairo    false    277   L       a          0    16398    django_content_type 
   TABLE DATA           C   COPY public.django_content_type (id, app_label, model) FROM stdin;
    public          jairo    false    218    L       _          0    16390    django_migrations 
   TABLE DATA           C   COPY public.django_migrations (id, app, name, applied) FROM stdin;
    public          jairo    false    216   `M       �          0    17116    django_session 
   TABLE DATA           P   COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
    public          jairo    false    278   �Q       �           0    0 !   DevolucionesApp_devolucion_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."DevolucionesApp_devolucion_id_seq"', 1, false);
          public          jairo    false    242            �           0    0 '   DevolucionesApp_motivodevolucion_id_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('public."DevolucionesApp_motivodevolucion_id_seq"', 1, false);
          public          jairo    false    244            �           0    0 1   DevolucionesApp_relacionproductodevolucion_id_seq    SEQUENCE SET     b   SELECT pg_catalog.setval('public."DevolucionesApp_relacionproductodevolucion_id_seq"', 1, false);
          public          jairo    false    246            �           0    0    EntradasApp_entrada_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."EntradasApp_entrada_id_seq"', 1, false);
          public          jairo    false    256            �           0    0    EntradasApp_pagoentrada_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."EntradasApp_pagoentrada_id_seq"', 1, false);
          public          jairo    false    258            �           0    0    EntradasApp_proveedor_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."EntradasApp_proveedor_id_seq"', 1, false);
          public          jairo    false    260            �           0    0 *   EntradasApp_relacionproductoentrada_id_seq    SEQUENCE SET     [   SELECT pg_catalog.setval('public."EntradasApp_relacionproductoentrada_id_seq"', 1, false);
          public          jairo    false    262            �           0    0    FinanzasApp_cierre_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."FinanzasApp_cierre_id_seq"', 1, false);
          public          jairo    false    248            �           0    0    FinanzasApp_metododepago_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."FinanzasApp_metododepago_id_seq"', 1, false);
          public          jairo    false    250            �           0    0    FinanzasApp_movimientos_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."FinanzasApp_movimientos_id_seq"', 1, false);
          public          jairo    false    252            �           0    0     FinanzasApp_transferencia_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public."FinanzasApp_transferencia_id_seq"', 1, false);
          public          jairo    false    254            �           0    0    GastosApp_gasto_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."GastosApp_gasto_id_seq"', 1, false);
          public          jairo    false    266            �           0    0    GastosApp_tipogasto_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."GastosApp_tipogasto_id_seq"', 1, false);
          public          jairo    false    264            �           0    0 1   GestionDeUsuariosApp_grupos_grupo_permisos_id_seq    SEQUENCE SET     b   SELECT pg_catalog.setval('public."GestionDeUsuariosApp_grupos_grupo_permisos_id_seq"', 1, false);
          public          jairo    false    238            �           0    0 )   GestionDeUsuariosApp_permisosgrupo_id_seq    SEQUENCE SET     Z   SELECT pg_catalog.setval('public."GestionDeUsuariosApp_permisosgrupo_id_seq"', 1, false);
          public          jairo    false    234            �           0    0 2   GestionDeUsuariosApp_permisosgrupo_permisos_id_seq    SEQUENCE SET     c   SELECT pg_catalog.setval('public."GestionDeUsuariosApp_permisosgrupo_permisos_id_seq"', 1, false);
          public          jairo    false    236            �           0    0 "   GestionDeUsuariosApp_tenant_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."GestionDeUsuariosApp_tenant_id_seq"', 1, false);
          public          jairo    false    225            �           0    0 +   GestionDeUsuariosApp_usuarios_groups_id_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public."GestionDeUsuariosApp_usuarios_groups_id_seq"', 1, false);
          public          jairo    false    230            �           0    0 $   GestionDeUsuariosApp_usuarios_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."GestionDeUsuariosApp_usuarios_id_seq"', 1, true);
          public          jairo    false    228            �           0    0 5   GestionDeUsuariosApp_usuarios_user_permissions_id_seq    SEQUENCE SET     f   SELECT pg_catalog.setval('public."GestionDeUsuariosApp_usuarios_user_permissions_id_seq"', 1, false);
          public          jairo    false    232            �           0    0    InventarioApp_producto_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."InventarioApp_producto_id_seq"', 1, false);
          public          jairo    false    240            �           0    0    VentasApp_cliente_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."VentasApp_cliente_id_seq"', 1, false);
          public          jairo    false    268            �           0    0    VentasApp_pagoventa_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."VentasApp_pagoventa_id_seq"', 1, false);
          public          jairo    false    274            �           0    0 &   VentasApp_relacionproductoventa_id_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public."VentasApp_relacionproductoventa_id_seq"', 1, false);
          public          jairo    false    272            �           0    0    VentasApp_venta_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."VentasApp_venta_id_seq"', 1, false);
          public          jairo    false    270            �           0    0    auth_group_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);
          public          jairo    false    221            �           0    0    auth_group_permissions_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);
          public          jairo    false    223            �           0    0    auth_permission_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_permission_id_seq', 108, true);
          public          jairo    false    219            �           0    0    django_admin_log_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);
          public          jairo    false    276            �           0    0    django_content_type_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.django_content_type_id_seq', 27, true);
          public          jairo    false    217            �           0    0    django_migrations_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.django_migrations_id_seq', 54, true);
          public          jairo    false    215            z      x������ � �      |      x������ � �      ~      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      j      x������ � �      v      x������ � �      r      x������ � �      t      x������ � �      i      x������ � �      l   �   x���
�0 F����»H���
�J%��!�R3'�2ʞ>�<��ap;��A���jf���l���n��W��j�N}sT�1%���M��Yz;7�k���/�^���g\� DKP���ti,2�b�Z�iiL�5����O0��Bdʒe�D ��6bm�����#jqjcJZ5�0� �_��7      n      x������ � �      p      x������ � �      x      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      e      x������ � �      g      x������ � �      c   A  x���͎�:���S�	.b���zZ̪��ⶫ�������N.�H]��b�)R�q�v��s��T��Tͬ��g��0������,���5-]A��G�<PqK��{��qK�%����ظ��*);�����m����[[q �:ÖV�,а�$i4�6�<t���-H ���s+N~g]��V� ,��B�@*��ER�k�!|�����%	�q��K+g�*�WVۄg���U�&���Iu��]�`^�|c�*�:��cy�s���JH�}��x��~7ٚT�yg����8K�'�f��6�@��ZR���K������~�q��{�|��hpнh>�u��ԽX:�u���_���u���ZȰ�cw�͉�j�|���ģ���	��<Jh��4}�Gɴ:|U��Wٖ>��+����<aP��$̔ �HdB��oաMX(�T��^B�Li��6 ��4@��	X��0�c���V��q�~�vY��I6����XY���XeMm 2�Tn��+�|�M��������c���|���9R��Cg�D7m��h5y�}��,�]{G+�����H���JIcdʘY���P�~��+����x�<��w?���x�
�z#Bj7�{oIɆ ��!�RC@izҥ~���;���n��&d��z�Ůc��k_�m��07����몦��;���p�b��[���X�$~��'1��Wt�	���S;;T�x�8�;����i$E���Z�E��Ɨ�F�
��^#�u���%@��Ȁ�#sd��'���:.̣U3dy�q�J��"�O)%_�)c"e�gaB]�ڝOmV��	�+�+�H���C��m�/���>�窫��9.0�Q�Y����t)�7���^��/���#�\q��[0�p���D�KnX�L��r�MY��1��nw�b:$0	7ޒ:"0i��d@`Jo��q��>+���n��@� �NZ�p���MPu���QeEl�q�`��f��a-����	!!�nL��9;I�ȣ$w'�z����$y��e�92I�qJ�2M�¡� 5���?�ͬ.���iP����s�|�      �      x������ � �      a   0  x�mR�n� =�|Lp�c��Q?�=��쩋d3��R��۵p�o��	�鵁�[2��P���,�^{��`51��hq5����fɗ w�i����Ù�b� �Wk�Y0Ğ���,�:��u��:��\��Q���7�͊���Ek��@԰C!W��̥��7m���l�&��v����Lk��(vk���Ԏ=��JJ��&G��i���'�(i�mF(�=S'��i�3}�����(�(7���E�����7J��0}�c���!ݕ�9�19�[���X�o'����P��>��r(,9݉�zA�?���      _     x���ێ�6@��_��"9��@Ң�> �qH�"��l��#���B�Z�`Jsf87i����ey�\B�m�vi��Q���B�g�?S���_	y�;I�������v}c��wy��fE��>.ߟ+����O`�nq��Է���!h�}��vn8�WY�'�H(vBg|��n���o�Dᗔ����2��jIW�Jq���y��?���cWp�dF�
�	"1?����dW����W�Iu2��ڦ^�4ۺi��&?���s}p�miM�
�$�t�3�\l�V!K(M$s�-(�J�hQ8�(9��?��0L���R{�CΎ���v��y� �ˁ�R��宾���m	�DHe*�?ܼ��/��XO�����4�4"d�]��0Go�sN��ϵb4�8UE<K�X,��{�%���塱���E�{cg������Ub�����K���|S�[���)�d��<�Jh��n��y��OM����@�?����dE�9�:�mwYr��Z�� ��t�Vp��|+C���`��)��Ϙ��t-�M�ڤק���Xs�X��}�3F(j��G�GxSX,6*.Q!Q�*�;��`�꣹���<�%ĊUI��(�$� +�$��ɾ�Ԟ
H��c��sxűa��p��c���^}q��;��"���;�	af"'���f2'}N�&��8�8�>��V9�TU�������v�hsJ�J>ډ�� h����T7�T
t?�!t��J>V����&H�[ɳ�\\N^�ݦ>��ew�6�c�[���[�.ݵ��-��[�mRJ��39-8n���a�����_�=��IP�o.���T�.^�jiG��%+JŨ��������,V�+C��b�r����~�S�e)��H.d���o(�ؚ|s�?��F9�$S��r��Tac!*�ǂ\˝����}nk7$��	<B $��[Jӷ�s�$vB+�]ֻ�ZTog�����׮,D�h�<��!������_���v�ݷ��aL�j��jv���Ӎ(- ����^^^�w��      �      x������ � �     