from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request


# mock-данных для входа
LOG_IN = {
    'email': 'test@example.com',
    'password': '123456'
}

# функция для проверки введенных данных пользовтелем при входе
@api_view(['POST'])
def login_view(request: Request) -> Response:
    email = request.data.get('email')
    password = request.data.get('password')

    if email == LOG_IN['email'] and password == LOG_IN['password']:
        return Response({
            "success": True,
            "user": {
                "email": email,
                "name": "testing user"
            }
        })
    else:
        return Response({
            "success": False,
            "error": "Неверный логин или пароль",
        }, status=400)
    

# mock-даные "Мои нейросотрудники"
MY_EMPLOYEES = [
    {
    'id': 1,
    'avatar': 'img',
    'name': 'Нейросотрудник Макс',
    'description': 'Ваш личный помощник',
    'status': 'активен',
    'count_message': 3
    },

    {
    'id': 2,
    'avatar': 'img',
    'name': 'Нейросотрудник Ольга',
    'description': 'Юрист',
    'status': 'активен',
    'count_message': 1
    },

    {
    'id': 3,
    'avatar': 'img',
    'name': 'Нейросотрудник Павел',
    'description': 'Маркетолог',
    'status': 'активен',
    'count_message': 4
    }
]

# функция, которая возращает список "Мои нейросотрудники"
@api_view(['GET'])
def get_my_employees(request: Request) -> Response:
    return Response({
        "employees": MY_EMPLOYEES
    })


# mock-даные "Мои нейросотрудники"
READY_EMPLOYEES = [
    {
    'id': 1,
    'avatar': 'img',
    'name': 'Нейросотрудник Наталья',
    'description': 'HR-ассистент',
    'status': 'активен',
    'count_message': 3
    },

    {
    'id': 2,
    'avatar': 'img',
    'name': 'Нейросотрудник Михаил',
    'description': 'Специалист по продажам',
    'status': 'активен',
    'count_message': 7
    },

    {
    'id': 3,
    'avatar': 'img',
    'name': 'Нейросотрудник Сергей',
    'description': 'Финансовый аналитик',
    'status': 'активен',
    'count_message': 0
    }
]

# функция, которая возращает список "Готовые нейросотрудники"
@api_view(['GET'])
def get_ready_employees(request: Request) -> Response:
    return Response({
        "employees": READY_EMPLOYEES
    })


# функция для иммитации ответов нейросотрудников
@api_view(['POST'])
def send_message(request: Request) -> Response:

    user_message = request.data.get('message')

    if not user_message:
        return Response({
            "reply": "Введите ваш запрос!"
        })

    msg = user_message.lower()

    if "привет" in msg or "здравствуйте" in msg:
        reply = "Здравствуйте! Чем я могу вам помочь?"

    elif "как дела" in msg:   
        reply = "У меня всё потихоньку. А как ваши?"

    elif "пока" in msg or "до свидания" in msg:
        reply = "До новых встреч!"

    else:
        reply = "Пока я просто имитация и не могу поболтать на разные темы."
        
    return Response({
        "reply": reply
    })
