from rest_framework import pagination
from rest_framework.response import Response

class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'count'
    max_page_size = 20

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'results': data,
            'total_pages': self.page.paginator.num_pages  # Agrega el número de páginas
        })
