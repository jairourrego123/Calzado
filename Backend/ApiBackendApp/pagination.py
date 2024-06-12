from rest_framework import pagination

class StandardResultsSetPagination(pagination.PageNumberPagination):
    ##GET https://api.example.org/accounts/?page=4?count=2
    page_size = 20  # tamaño de la pagina
    page_size_query_param = 'count' ## tamaño de la consulta , cuantos se quieren en cada pagina
    max_page_size = 20  # numero maximo por pagina 