from documents.models import Value, DocumentOwnership
from ..models import Application, EligibilityCheck


def check_eligibility(application: Application, eligibility_check: EligibilityCheck) -> bool:
    is_eligible = True
    user_documents = application.user.documents.all()

    user_value = None
    for document in user_documents:
        owned_document = DocumentOwnership.objects.get(document=document, owner=application.user)
        user_values = owned_document.values.all()
        if user_values.filter(attribute=eligibility_check.attribute).exists():
            user_value = user_values.get(attribute=eligibility_check.attribute)
            break
    
    if user_value is None:
        return False

    if eligibility_check.edge_option:
        if eligibility_check.logic.name == '=':
            is_eligible &= user_value.option == eligibility_check.edge_option
        elif eligibility_check.logic.name == '!=':
            is_eligible &= user_value.option != eligibility_check.edge_option
        else:
            raise Exception('Unsupported logic')
    else:
        if eligibility_check.logic.name == '=':
            is_eligible &= user_value.value == eligibility_check.edge_value
        elif eligibility_check.logic.name == '!=':
            is_eligible &= user_value.value != eligibility_check.edge_value
        elif eligibility_check.logic.name == '>':
            is_eligible &= user_value.value > eligibility_check.edge_value
        elif eligibility_check.logic.name == '<':
            is_eligible &= user_value.value < eligibility_check.edge_value
        elif eligibility_check.logic.name == '>=':
            is_eligible &= user_value.value >= eligibility_check.edge_value
        elif eligibility_check.logic.name == '<=':
            is_eligible &= user_value.value <= eligibility_check.edge_value
        else:
            raise Exception('Unsupported logic')

    return is_eligible